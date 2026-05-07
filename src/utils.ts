import type { Message } from "./types.js";

export function createMessage(role: Message['role'], content: string): Message {
    return {role, content, timestamp: Date.now()}
}

export function formatTime(ts: number): string {
    return new Date(ts).toLocaleString()
}

