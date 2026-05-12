export type Command = 
    | {type: 'exit'}
    | {type: 'new'}
    | {type: 'history'}
    | {type: 'load'; id: string}
    | {type: 'config'; key: string; vlaue: string}
    | {type: 'help'}
    | {type: 'chat'; content: string}

export function parseCommand(input: string): Command {
    const t = input.trim()
    if(t === '/exit') return { type: 'exit'}
    if(t === '/new') return { type: 'new'}
    if(t === '/history') return { type: 'history'}
    if(t === '/help') return { type: 'help'}
    if(t.startsWith('/load')) return { type: 'load', id: t.slice(6)}
    if(t.startsWith('/config')) {
        const [, k, v] = t.split(' ')
        return {type: 'config', key: k, vlaue: v}
    }
    return {type: 'chat', content: t}

}