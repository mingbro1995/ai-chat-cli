import * as readline from 'readline'
import {stdin, stdout} from 'process'

export function createPrompt(): readline.Interface {
    return readline.createInterface({input: stdin, output: stdout})
}

export function ask(rl: readline.Interface, question: string): Promise<string> {
    return new Promise(resolve=>rl.question(question, resolve))
}