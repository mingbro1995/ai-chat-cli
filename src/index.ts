import { createMessage } from "./utils.js";
import { loadConfig, saveConfig } from "./config.js";
import type { Message } from "./types.js";
import {ask, createPrompt} from './cli.js'
import { AIClient } from "./api.js";
import { log } from "node:console";
import { parseCommand } from "./commands.js";


async function main() {

    const config = loadConfig()
    const client = new AIClient(config)

    const rl = createPrompt()
    const messages: Message[] = []

    console.log('AI Chat CLI -- 输入 /exit 退出\n')

    while(true) {
        const input = await ask(rl, 'You: ')
        if(input === '/exit') {
            console.log('Bye!')
            rl.close()
            break
        }
        const command = parseCommand(input)
        switch(command.type){
            case 'exit':
                console.log('Bye!')
                rl.close()
                break
            case 'config':
                break
            case 'history':
                break
            case 'help':
                break
            case 'load':
                break
            case 'new':
                break
            case 'chat':
                break
        }
        messages.push(createMessage('user', input))
        const response = await client.chat(messages)
        log(`AI: ${response}\n`)
        messages.push(createMessage('assistant', response))
    }
}

main()