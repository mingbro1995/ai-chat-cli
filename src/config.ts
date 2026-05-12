import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'fs'
import {join} from 'path'
import type { ChatConfig } from './types.js'

const CONFIG_DIR = join(process.cwd(), '.ai-chat')
const CONFIG_FILE = join(CONFIG_DIR, 'config.json')

export const DEFAULT_CONFIG : ChatConfig = {
    apiKey: process.env.DEEPSEEK_API_KEY ?? '',
    model: 'deepseek-chat',
    maxTokens: 2000,
    temperature: 0.7
}

export function loadConfig(): ChatConfig {
    if(!existsSync(CONFIG_FILE)) return{...DEFAULT_CONFIG}
    const raw = readFileSync(CONFIG_FILE, 'utf-8')
    const parsed = JSON.parse(raw) as ChatConfig
    return {...DEFAULT_CONFIG, ...parsed}
}

export function saveConfig(config: ChatConfig): void {
    if(!existsSync(CONFIG_DIR)) mkdirSync(CONFIG_DIR, { recursive: true})
    writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2))
}