import {readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, writeFile, read} from 'fs'
import { join } from 'path'
import type { Conversation, Message } from './types.js'
import { json } from 'stream/consumers'


const HISTORY_DIR = join(process.cwd(), '.ai-chat', 'history')

function ensureDir(): void {
    if(!existsSync(HISTORY_DIR)) mkdirSync(HISTORY_DIR, { recursive: true})
}

export function saveConv(conv: Conversation): void {
    ensureDir();
    writeFileSync(join(HISTORY_DIR, `${conv.id}.json`),JSON.stringify(conv, null, 2))
}

export function loadCConv(id: string): Conversation | null {
    const path = join(HISTORY_DIR, `${id}.json`)
    if(!existsSync(path)) return null
    return JSON.parse(readFileSync(path, 'utf-8')) as Conversation
}

export function listConvs(): Conversation[]  {
    ensureDir();
    return readdirSync(HISTORY_DIR)
        .filter(f => f.endsWith('.json'))
        .map(f => JSON.parse(readFileSync(join(HISTORY_DIR,f),'utf-8')) as Conversation)
        .sort((a, b) => b.updateAt - a.updateAt)
}

export function createConv( title: string = 'New Chat'): Conversation {
    return {
        id: `conv-${Date.now()}`,
        messages: [],
        title,
        createdAt: Date.now(),
        updateAt: Date.now()
    }
}

export function addMessage(conv: Conversation, msg: Message): Conversation {
    const updated: Conversation = {
        ...conv,
        messages: [...conv.messages, msg],
        updateAt: Date.now()
    }
    saveConv(updated)
    return updated
}