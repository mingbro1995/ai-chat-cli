interface Message {
    role: 'user' | 'assistant' | 'system',
    content: string,
    timestamp?: number
}

interface Conversation {
    id: string,
    messages: Message[];
    createdAt: number
}

interface Config {
    readonly apiKey: string,
    model: string,
    temperature: number
}

const msg1: Message = {
    role: "system",
    content: "You are a helpful assistant."
}

const msg2: Message = {
    role: "user",
    content: "Hello!",
    timestamp: Date.now()
};

const config: Config = {
    apiKey: 'sk-test123',
    model: 'gpt-4',
    temperature: 0.7
}

// config.apiKey = "new-key";

const conv: Conversation = {
    id: 'conv-001',
    messages: [msg1, msg2],
    createdAt: Date.now()
}

console.log(JSON.stringify(conv, null, 2))