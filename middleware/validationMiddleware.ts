import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateRegister = [
    body("username").isLength({ min: 3 }).withMessage("Username must be 3 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6 characters long"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
