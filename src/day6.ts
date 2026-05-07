function identity<T>(arg: T): T {
    return arg
}
const n = identity<number>(42)
const s = identity('hello')

interface HasId {
    id: string | number
}

function findById<T extends HasId>(items: T[], id: string | number): T | undefined {
    return items.find(item => item.id === id)
}

const users = [{id: 1, name: 'Alice'}, {id: 2, name: 'Blob'}]
console.log(findById(users,1));


interface ApiResponse<T> {
    data: T;
    status: number;
    error?: string
}

interface User {
    id: number;
    name: string 
}

const userResp: ApiResponse<User> = {
    data: {id: 1, name: 'Alice'},
    status: 200
}

function pair<T, U> (first: T, second: U) : [T, U] {
    return [first, second]
}

const p = pair('hello', 42)

function last<T>(arr: T[]): T | undefined{
    return arr[arr.length -1]
}

console.log(last([ 1, 2, 3]));
