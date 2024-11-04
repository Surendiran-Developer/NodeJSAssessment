import { Request, Response } from 'express';
import { parseExcelFile } from '../utils/fileParser';
import Chat from '../models/Chat';

export const importChat = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const chatData = await parseExcelFile(req.file.path);

    await Chat.bulkCreate(chatData);

    res.json({ message: 'Chat history imported successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error importing chat history' });
  }
};
