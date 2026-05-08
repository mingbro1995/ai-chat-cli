import { createMessage } from "./utils.js";
import { loadConfig, saveConfig } from "./config.js";
import type { Message } from "./types.js";
import {ask, createPrompt} from './cli.js'


const config = loadConfig()
console.log('Config loaded:', config.model)

const msg = createMessage('user', 'Hello')
console.log(msg)

async function main() {
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
        messages.push(createMessage('user', input))
        console.log(`[Recorded ${messages.length} messages] \n`)
    }
}

main()