type MessageRole = 'user' | 'assistant' | 'system'
type Status = 'loading' | 'success' | 'error'
function processValue(val: string | number | boolean): string {
    if(typeof val === 'string') {
        return val.toUpperCase()
    }
    if(typeof val === 'number'){
        return (val * 2).toString()
    }
    return val? 'YES' : 'NO' 
}

interface UserMessage {
    kind: 'user';
    content: string;
}

interface AssistantMessage {
    kind: 'assistant';
    content: string;
    model: string;
}

type ChatMessage = UserMessage | AssistantMessage

function handleMessage(msg: ChatMessage): void {
    if(msg.kind === 'user') {
        console.log(`User: ${msg.content}`)
    }else {
        console.log(`AI ${msg.model}: ${msg.content}`);
    }
}


function isAssistant(msg: ChatMessage): msg is AssistantMessage {
    return msg.kind ===  "assistant"
}

const msgs: ChatMessage[] = [
    {kind: 'user', content: 'Hi'},
    {kind: 'assistant', content: 'Hello!', model: 'gpt-4'}
]

msgs.forEach(handleMessage)