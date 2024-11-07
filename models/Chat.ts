import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("chats")
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    username: string;

    @Column({ type: "text" })
    message: string;

    @CreateDateColumn({ type: "timestamp" })
    timestamp: Date;
}
