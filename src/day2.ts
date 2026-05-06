const botName: string = 'AI Assistant'
const maxTokens: number = 2000
const isOnline: boolean = true

const commands: string[] = ['chat', 'history', 'exit']
const scores: Array<number> = [95, 87, 92]

const botInfo: [string, number, boolean] = ['GPT-4', 4, true]

enum MessageRole {
    User = 'user',
    Assistant = 'assistant',
    System = 'system',
}
const role: MessageRole = MessageRole.User

let temp: any = 'hello'
temp = 123

let userInput: unknown = getUserInput()
function getUserInput():unknown {
    return 'hello world'
}

if(typeof userInput === 'string') {
    console.log(userInput.toUpperCase());
    
}

function logMessage(msg: string): void {
    console.log(`[LOG] ${msg}`);
}

let empty: null = null
let notSet: undefined = undefined

console.log({botName, maxTokens, isOnline, commands, scores, botInfo, role});
