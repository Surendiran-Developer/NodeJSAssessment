import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import xlsx from 'xlsx';
import Chat from '../models/Chat';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/register', [
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

export default router;

router.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty()
  ], async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  });

  router.post('/import-chat', upload.single('file'), async (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ error: 'File not uploaded' });
  
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
  
    for (const row of data) {
      await Chat.create({ username: row['Username'], message: row['Message'], timestamp: new Date(row['Timestamp']) });
    }
  
    res.json({ message: 'Chat history imported successfully' });
  });