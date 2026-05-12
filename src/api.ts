import type {Message, ChatConfig} from './types.js'


interface ApiRequest {
    model: string;
    messages: Array<{role: string; content: string}>;
    max_tokens: number;
    temperature: number;
}

interface ApiResponse {
    choices: Array<{ message: { role: string; content: string }}>
}

export class AIClient {
    constructor(private config: ChatConfig) {}
    
    async chat(messages: Message[]): Promise<string> {
        const body: ApiRequest  = {
            model: this.config.model,
            messages: messages.map(m => ({role: m.role, content: m.content})),
            max_tokens: this.config.maxTokens,
            temperature: this.config.temperature
        }

        const res = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify(body)
        })

        if(!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`)

        const data = await res.json() as ApiResponse
        return data.choices[0]?.message?.content || 'No response'
    }
}