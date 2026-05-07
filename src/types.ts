export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number
}

export interface Conversation {
    id: string;
    messages: Message[];
    title: string;
    createdAt: number;
    updateAt: number
}

export interface ChatConfig {
    apiKey: string;
    model: string;
    bseUrl?: string;
    maxTokens: number;
    temperature: number;
}