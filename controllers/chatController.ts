import { Request, Response } from "express";
import { getRepository } from "typeorm";
import xlsx from "xlsx";
import { Chat } from "../models/Chat";

export const importChatHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const file = req.file;

        if (!file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }

        const workbook = xlsx.readFile(file.path);
        const sheetName = workbook.SheetNames[0];
        const chatData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const chatRepository = getRepository(Chat);

        for (const chat of chatData) {
            const { username, message, timestamp } = chat as { username: string; message: string; timestamp: string };
            
            if (!username || !message || !timestamp) {
                res.status(400).json({ message: "Invalid data format in Excel sheet..." });
                return;
            }

            const newChat = chatRepository.create({ username, message, timestamp: new Date(timestamp) });
            await chatRepository.save(newChat);
        }

        res.status(200).json({ message: "Chat history imported successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error importing chat history", error });
    }
};

export const getChatHistory = async (req: Request, res: Response): Promise<void> => {
    try {
        const chatRepository = getRepository(Chat);

        const chatHistory = await chatRepository.find();

        res.status(200).json(chatHistory);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving chat history", error });
    }
};




/* import { Request, Response } from 'express';
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
}; */