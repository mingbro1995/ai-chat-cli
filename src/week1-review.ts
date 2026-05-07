interface Message {
    role: string ;
    content: string;
    timestamp?: number
}

interface Conversation {
    id: string;
    messages: Message[];
    title: string;
    createdAt: string
}

function findById<T extends {id: string}>(id:string, list: T[]): T | undefined{
    return list.find(item=>item.id === id)
}

type Command = 'send' | 'history' | 'clear'


function handleCommand(command: Command ):void {
    if( command === 'send') {
        console.log('send');
    }
    if( command === 'history'){
        console.log('history');
        
    }
    if( command === 'clear'){
        console.log('clear')
    }
}


function isMessage(obj: unknown): obj is Message {
    return (
        typeof obj === 'object' && 
        obj !== null && 
        'content' in obj && 
        typeof(obj as Record<string, unknown>).role === 'string' && 
        typeof (obj as Record<string, unknown>).content === 'string'
    )
}