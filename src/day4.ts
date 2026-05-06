import type {Message} from './day3.js'

function greet(name: string): string {
    return `Hello, ${name}`
}

function sendMessage(content: string, role?: string): string {
    return `[${role || 'user'}] ${content}`
}

function createMessage(content: string, role: string = 'user'): Message {
    return {
        role: role as "user" | "assistant" | "system",
        content,
        timestamp: Date.now()
    }
}

function logAll(...messages: string[]): void {
    messages.forEach((m,i) => console.log(`${i+ 1}.${m}`))
}

function processMessages(
    messages: string[],
    processor: (msg: string)=> string
): string[] {
    return messages.map(processor)
}

const formatMsg = (msg: string): string => `>${msg}`


const formatted = processMessages(['a', 'b'], formatMsg)
console.log(formatted);


function parseInput(input: string): Message | null {
    if(!input.trim()) return null
    return createMessage(input)
}

console.log(parseInput('hello'));
console.log(parseInput(''));

