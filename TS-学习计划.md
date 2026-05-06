# TypeScript 4周死命令式学习计划

> 目标：4周后拥有一个 **AI Chat CLI** 项目（命令行聊天工具），支持多轮对话、本地历史记录、配置管理、流式输出。代码量约800-1000行，全部TypeScript。
> 规则：没有"可以参考"，只有"今天必须完成这个代码，写完你就掌握了"。

---

## 第1周：TypeScript 核心语法（建立类型思维）

### Day 1：环境搭建 —— 必须成功编译运行

1. 打开终端，执行：
```bash
mkdir ai-chat-cli && cd ai-chat-cli
npm init -y
npm install -D typescript @types/node tsx
npx tsc --init
```

2. 修改 `tsconfig.json`，只改这几个：
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

3. 修改 `package.json`：
```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts"
  },
  "type": "module"
}
```

4. 创建 `src/index.ts`，写：
```typescript
const userName: string = "User";
const version: number = 1.0;
const isReady: boolean = true;

console.log(`${userName} v${version} ready: ${isReady}`);
```

5. 运行：
```bash
npm run build
node dist/index.js
```

**验收标准**：终端输出 `User v1 ready: true`。如果报错，解决到能运行为止。

---

### Day 2：基础类型 —— 必须写满这些代码

创建 `src/day2.ts`：
```typescript
// 1. 字符串、数字、布尔 —— 最基础的三种
const botName: string = "AI Assistant";
const maxTokens: number = 2000;
const isOnline: boolean = true;

// 2. 数组 —— 两种写法都要会
const commands: string[] = ["chat", "history", "exit"];
const scores: Array<number> = [95, 87, 92];

// 3. 元组 —— 固定长度、固定类型的数组
const botInfo: [string, number, boolean] = ["GPT-4", 4, true];

// 4. 枚举 —— 给一组常量起名字
enum MessageRole {
    User = "user",
    Assistant = "assistant",
    System = "system"
}
const role: MessageRole = MessageRole.User;

// 5. any —— 逃避类型检查（知道就行，项目里不许用）
let temp: any = "hello";
temp = 123;

// 6. unknown —— 安全的any，用之前必须判断类型
let userInput: unknown = getUserInput();
function getUserInput(): unknown {
    return "hello world";
}
if (typeof userInput === "string") {
    console.log(userInput.toUpperCase());
}

// 7. void —— 函数不返回值
function logMessage(msg: string): void {
    console.log(`[LOG] ${msg}`);
}

// 8. null 和 undefined
let empty: null = null;
let notSet: undefined = undefined;

// 打印验收
console.log({ botName, maxTokens, isOnline, commands, scores, botInfo, role });
```

运行 `npm run dev src/day2.ts`，看到输出即通过。

---

### Day 3：接口（Interface）—— TS最重要的概念

创建 `src/day3.ts`：
```typescript
// 1. 定义消息结构
interface Message {
    role: "user" | "assistant" | "system";
    content: string;
    timestamp?: number;  // ? 表示可选
}

// 2. 定义对话结构
interface Conversation {
    id: string;
    messages: Message[];
    createdAt: number;
}

// 3. 定义配置结构
interface Config {
    readonly apiKey: string;  // readonly 表示只读，创建后不能改
    model: string;
    temperature: number;
}

// 4. 创建实际对象
const msg1: Message = {
    role: "system",
    content: "You are a helpful assistant."
};

const msg2: Message = {
    role: "user",
    content: "Hello!",
    timestamp: Date.now()
};

const config: Config = {
    apiKey: "sk-test123",
    model: "gpt-4",
    temperature: 0.7
};

// 5. 尝试改 readonly，看看TS报什么错（然后把这行注释掉）
// config.apiKey = "new-key";

// 6. 嵌套对象
const conv: Conversation = {
    id: "conv-001",
    messages: [msg1, msg2],
    createdAt: Date.now()
};

console.log(JSON.stringify(conv, null, 2));
```

**验收标准**：
- 取消注释 `config.apiKey = "new-key"` 时，TypeScript报错（TS2540）
- 编译通过，运行正常

---

### Day 4：函数类型

创建 `src/day4.ts`：
```typescript
import type { Message } from "./day3.js";

// 1. 基本函数 —— 参数和返回值都要有类型
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// 2. 可选参数 —— 用 ? 
function sendMessage(content: string, role?: string): string {
    return `[${role || "user"}] ${content}`;
}

// 3. 默认参数
function createMessage(content: string, role: string = "user"): Message {
    return {
        role: role as "user" | "assistant" | "system",
        content,
        timestamp: Date.now()
    };
}

// 4. 剩余参数
function logAll(...messages: string[]): void {
    messages.forEach((m, i) => console.log(`${i + 1}. ${m}`));
}

// 5. 函数作为参数（回调）
function processMessages(
    messages: string[],
    processor: (msg: string) => string
): string[] {
    return messages.map(processor);
}

// 6. 箭头函数类型
const formatMsg = (msg: string): string => `> ${msg}`;

// 测试
const formatted = processMessages(["a", "b"], formatMsg);
console.log(formatted);

// 7. 返回联合类型的函数
function parseInput(input: string): Message | null {
    if (!input.trim()) return null;
    return createMessage(input);
}

console.log(parseInput("hello"));
console.log(parseInput(""));
```

**验收标准**：编译通过，理解每个函数的参数类型和返回值类型。

---

### Day 5：联合类型 + 类型收窄

创建 `src/day5.ts`：
```typescript
// 1. 联合类型 —— 一个值可以是多种类型之一
type MessageRole = "user" | "assistant" | "system";
type Status = "loading" | "success" | "error";

// 2. typeof 收窄
function processValue(val: string | number | boolean): string {
    if (typeof val === "string") {
        return val.toUpperCase();  // TS知道这里是string
    }
    if (typeof val === "number") {
        return (val * 2).toString();  // TS知道这里是number
    }
    return val ? "YES" : "NO";  // TS知道这里是boolean
}

// 3. 字面量类型收窄 —— 用 kind 字段区分
interface UserMessage {
    kind: "user";
    content: string;
}

interface AssistantMessage {
    kind: "assistant";
    content: string;
    model: string;
}

type ChatMessage = UserMessage | AssistantMessage;

function handleMessage(msg: ChatMessage): void {
    if (msg.kind === "user") {
        console.log(`User: ${msg.content}`);
        // msg.model 会报错，因为UserMessage没有model
    } else {
        console.log(`AI (${msg.model}): ${msg.content}`);
    }
}

// 4. 类型守卫函数 —— is 关键字
function isAssistant(msg: ChatMessage): msg is AssistantMessage {
    return msg.kind === "assistant";
}

// 测试
const msgs: ChatMessage[] = [
    { kind: "user", content: "Hi" },
    { kind: "assistant", content: "Hello!", model: "gpt-4" }
];

msgs.forEach(handleMessage);
```

**验收标准**：在 `handleMessage` 的 `user` 分支里尝试访问 `msg.model`，确认TypeScript报错。

---

### Day 6：泛型 —— 让函数处理多种类型

创建 `src/day6.ts`：
```typescript
// 1. 泛型函数 —— T是占位符，调用时确定类型
function identity<T>(arg: T): T {
    return arg;
}
const n = identity<number>(42);      // T = number
const s = identity("hello");          // TS自动推断 T = string

// 2. 泛型约束 —— T必须满足某些条件
interface HasId {
    id: string | number;
}
function findById<T extends HasId>(items: T[], id: string | number): T | undefined {
    return items.find(item => item.id === id);
}

const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
console.log(findById(users, 1));

// 3. 泛型接口 —— 复用结构
interface ApiResponse<T> {
    data: T;
    status: number;
    error?: string;
}

interface User {
    id: number;
    name: string;
}

const userResp: ApiResponse<User> = {
    data: { id: 1, name: "Alice" },
    status: 200
};

// 4. 多个泛型参数
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}
const p = pair("hello", 42);

// 5. 泛型在数组方法中
function last<T>(arr: T[]): T {
    return arr[arr.length - 1];
}
console.log(last([1, 2, 3]));  // 推断为 number
```

**验收标准**：编译通过，理解 `<T>` 就是"先占个位置，具体类型后面确定"。

---

### Day 7：第1周综合考核

创建 `src/week1-review.ts`，**必须包含以下所有内容**：

```typescript
// 要求：
// 1. 定义 Message 接口（role, content, timestamp可选）
// 2. 定义 Conversation 接口（id, messages数组, title, createdAt）
// 3. 写一个泛型函数 findById<T extends { id: string }>
// 4. 用联合类型定义 Command = "send" | "history" | "clear"
// 5. 写一个处理命令的函数，用switch或if收窄处理不同命令
// 6. 写一个类型守卫函数 isMessage(obj: unknown): obj is Message
// 7. 所有函数必须有参数类型和返回值类型

// 把你的代码写在这里：
```

**验收标准**：`npm run build` 零报错。

---

## 第2周：模块系统 + 项目骨架

### Day 8：拆分模块

把代码拆成文件结构：
```
src/
├── types.ts        <- 所有接口
├── utils.ts        <- 工具函数
├── config.ts       <- 配置读写
└── index.ts        <- 入口
```

`src/types.ts`：
```typescript
export interface Message {
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: number;
}

export interface Conversation {
    id: string;
    messages: Message[];
    title: string;
    createdAt: number;
    updatedAt: number;
}

export interface ChatConfig {
    apiKey: string;
    model: string;
    baseUrl?: string;
    maxTokens: number;
    temperature: number;
}
```

`src/utils.ts`：
```typescript
import type { Message } from "./types.js";

export function createMessage(role: Message["role"], content: string): Message {
    return { role, content, timestamp: Date.now() };
}

export function formatTime(ts: number): string {
    return new Date(ts).toLocaleString();
}
```

`src/config.ts`：
```typescript
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import type { ChatConfig } from "./types.js";

const CONFIG_DIR = join(process.cwd(), ".ai-chat");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

export const DEFAULT_CONFIG: ChatConfig = {
    apiKey: "",
    model: "gpt-4o-mini",
    maxTokens: 2000,
    temperature: 0.7
};

export function loadConfig(): ChatConfig {
    if (!existsSync(CONFIG_FILE)) return { ...DEFAULT_CONFIG };
    const raw = readFileSync(CONFIG_FILE, "utf-8");
    const parsed = JSON.parse(raw) as ChatConfig;
    return { ...DEFAULT_CONFIG, ...parsed };
}

export function saveConfig(config: ChatConfig): void {
    if (!existsSync(CONFIG_DIR)) mkdirSync(CONFIG_DIR, { recursive: true });
    writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}
```

`src/index.ts`：
```typescript
import { createMessage } from "./utils.js";
import { loadConfig } from "./config.js";

const config = loadConfig();
console.log("Config loaded:", config.model);

const msg = createMessage("user", "Hello!");
console.log(msg);
```

运行 `npm run dev`。

---

### Day 9：命令行交互

安装 `readline`（Node内置，无需安装）：
```typescript
// src/cli.ts
import * as readline from "readline";
import { stdin, stdout } from "process";

export function createPrompt(): readline.Interface {
    return readline.createInterface({ input: stdin, output: stdout });
}

export function ask(rl: readline.Interface, question: string): Promise<string> {
    return new Promise(resolve => rl.question(question, resolve));
}
```

修改 `src/index.ts` 实现交互循环：
```typescript
import { ask, createPrompt } from "./cli.js";
import { createMessage } from "./utils.js";
import type { Message } from "./types.js";

async function main() {
    const rl = createPrompt();
    const messages: Message[] = [];
    
    console.log("AI Chat CLI -- 输入 /exit 退出\n");
    
    while (true) {
        const input = await ask(rl, "You: ");
        
        if (input === "/exit") {
            console.log("Bye!");
            rl.close();
            break;
        }
        
        messages.push(createMessage("user", input));
        console.log(`[Recorded ${messages.length} messages]\n`);
    }
}

main();
```

**验收标准**：能输入多轮对话，输入 `/exit` 正常退出。

---

### Day 10：调用 AI API

创建 `src/api.ts`：
```typescript
import type { Message, ChatConfig } from "./types.js";

interface ApiRequest {
    model: string;
    messages: Array<{ role: string; content: string }>;
    max_tokens: number;
    temperature: number;
}

interface ApiResponse {
    choices: Array<{ message: { role: string; content: string } }>;
}

export class AIClient {
    constructor(private config: ChatConfig) {}
    
    async chat(messages: Message[]): Promise<string> {
        const body: ApiRequest = {
            model: this.config.model,
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            max_tokens: this.config.maxTokens,
            temperature: this.config.temperature
        };
        
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify(body)
        });
        
        if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
        
        const data = await res.json() as ApiResponse;
        return data.choices[0]?.message?.content || "No response";
    }
}
```

修改 `src/index.ts` 调用API（需要有效的API key）：
```typescript
import { AIClient } from "./api.js";
import { loadConfig } from "./config.js";

// ... 在 main 函数中：
const config = loadConfig();
const client = new AIClient(config);

// 在收到用户输入后：
const response = await client.chat(messages);
console.log(`AI: ${response}\n`);
messages.push(createMessage("assistant", response));
```

**验收标准**：填入有效API key后，能跟AI对话。

---

### Day 11：流式输出

给 `AIClient` 添加流式方法：
```typescript
async *streamChat(messages: Message[]): AsyncGenerator<string> {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({
            model: this.config.model,
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            max_tokens: this.config.maxTokens,
            temperature: this.config.temperature,
            stream: true
        })
    });
    
    const reader = res.body?.getReader();
    if (!reader) throw new Error("No body");
    
    const decoder = new TextDecoder();
    let buffer = "";
    
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        
        for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);
            if (data === "[DONE]") return;
            try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) yield content;
            } catch { /* ignore */ }
        }
    }
}
```

修改主循环使用流式：
```typescript
process.stdout.write("AI: ");
let fullResponse = "";
for await (const chunk of client.streamChat(messages)) {
    process.stdout.write(chunk);
    fullResponse += chunk;
}
console.log("\n");
messages.push(createMessage("assistant", fullResponse));
```

---

### Day 12：对话历史持久化

创建 `src/storage.ts`：
```typescript
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "fs";
import { join } from "path";
import type { Conversation, Message } from "./types.js";

const HISTORY_DIR = join(process.cwd(), ".ai-chat", "history");

function ensureDir(): void {
    if (!existsSync(HISTORY_DIR)) mkdirSync(HISTORY_DIR, { recursive: true });
}

export function saveConv(conv: Conversation): void {
    ensureDir();
    writeFileSync(join(HISTORY_DIR, `${conv.id}.json`), JSON.stringify(conv, null, 2));
}

export function loadConv(id: string): Conversation | null {
    const path = join(HISTORY_DIR, `${id}.json`);
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, "utf-8")) as Conversation;
}

export function listConvs(): Conversation[] {
    ensureDir();
    return readdirSync(HISTORY_DIR)
        .filter(f => f.endsWith(".json"))
        .map(f => JSON.parse(readFileSync(join(HISTORY_DIR, f), "utf-8")) as Conversation)
        .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function createConv(title: string = "New Chat"): Conversation {
    return {
        id: `conv-${Date.now()}`,
        messages: [],
        title,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
}

export function addMessage(conv: Conversation, msg: Message): Conversation {
    const updated: Conversation = {
        ...conv,
        messages: [...conv.messages, msg],
        updatedAt: Date.now()
    };
    saveConv(updated);
    return updated;
}
```

---

### Day 13-14：命令系统 + 整合

创建 `src/commands.ts`：
```typescript
export type Command =
    | { type: "exit" }
    | { type: "new" }
    | { type: "history" }
    | { type: "load"; id: string }
    | { type: "config"; key: string; value: string }
    | { type: "help" }
    | { type: "chat"; content: string };

export function parseCommand(input: string): Command {
    const t = input.trim();
    if (t === "/exit") return { type: "exit" };
    if (t === "/new") return { type: "new" };
    if (t === "/history") return { type: "history" };
    if (t === "/help") return { type: "help" };
    if (t.startsWith("/load ")) return { type: "load", id: t.slice(6) };
    if (t.startsWith("/config ")) {
        const [, k, v] = t.split(" ");
        return { type: "config", key: k, value: v };
    }
    return { type: "chat", content: t };
}
```

重写 `src/index.ts` 整合所有功能（使用switch处理不同命令）。

**第2周末验收标准**：
- 能聊天
- 能保存历史
- 能用 `/history`、 `/load`、 `/new` 管理对话
- 流式输出正常

---

## 第3周：错误处理 + 配置完善 + 代码质量

### Day 15：自定义错误类

创建 `src/errors.ts`：
```typescript
export class AppError extends Error {
    constructor(msg: string, public code: string) {
        super(msg);
        this.name = "AppError";
    }
}

export class APIError extends AppError {
    constructor(msg: string, public status: number) {
        super(msg, "API_ERROR");
    }
}

export function formatError(e: unknown): string {
    if (e instanceof AppError) return `[${e.code}] ${e.message}`;
    if (e instanceof Error) return `[ERROR] ${e.message}`;
    return `[ERROR] ${String(e)}`;
}
```

把所有 `try/catch` 改成使用 `formatError`。

---

### Day 16：环境变量支持

```bash
npm install dotenv
```

创建 `.env`：
```
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4o-mini
```

修改 `config.ts`：
```typescript
import "dotenv/config";

// 在 loadConfig 中加入：
const envConfig: Partial<ChatConfig> = {
    ...(process.env.OPENAI_API_KEY && { apiKey: process.env.OPENAI_API_KEY }),
    ...(process.env.OPENAI_MODEL && { model: process.env.OPENAI_MODEL })
};
```

---

### Day 17：工具类型实战

在 `types.ts` 中练习：
```typescript
// 基于现有类型创建新类型
type MessageInput = Omit<Message, "timestamp">;           // 创建时不需要timestamp
type ConfigUpdate = Partial<ChatConfig>;                   // 更新时所有字段可选
type MessagePreview = Pick<Message, "role" | "content">;   // 只需要展示这两个字段

// 用在函数中
function updateConfig(current: ChatConfig, updates: ConfigUpdate): ChatConfig {
    return { ...current, ...updates };
}
```

---

### Day 18-19：第3周整合测试

完整测试清单：
1. 不带API key启动 -> 提示配置
2. `/config apiKey sk-xxx` -> 保存配置
3. 正常对话 -> AI回复，流式输出
4. `/new` -> 开启新对话
5. 多轮对话 -> 有上下文
6. `/history` -> 显示历史对话列表
7. `/load conv-xxx` -> 加载历史对话
8. 断网/API错误 -> 友好错误提示
9. `/exit` -> 正常退出

---

## 第4周：打磨 + 扩展

### Day 20：ESLint + Prettier

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier
```

创建 `.eslintrc.json`：
```json
{
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    "rules": {
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-explicit-any": "error"
    }
}
```

创建 `.prettierrc`：
```json
{ "semi": true, "singleQuote": false, "tabWidth": 4 }
```

`package.json` 添加：
```json
"lint": "eslint src/**/*.ts",
"format": "prettier --write src/**/*.ts"
```

运行 `npm run lint`，解决所有报错。

---

### Day 21-22：加功能（选一个）

**选项A：对话标题自动生成**
- 第一轮对话后，让AI生成一个5字标题
- 用 `saveConv` 更新标题

**选项B：导出Markdown**
- `/export` 命令
- 把当前对话导出为 `conv-xxx.md`

**选项C：多模型支持**
- 配置文件支持 `provider: "openai" | "anthropic"`
- 不同provider用不同的API格式

---

### Day 23-24：README + 项目文档

必须包含：
- 项目标题和一句话描述
- 安装步骤（clone -> npm install -> 配置.env）
- 使用示例（截图或代码块）
- 命令列表表格
- 技术栈说明（TypeScript + Node.js）

---

### Day 25：打包可执行文件

```bash
npm install -D pkg
```

`package.json`：
```json
"pkg": {
    "scripts": ["dist/**/*.js"],
    "assets": [".env"]
}
```

```bash
npm run build
npx pkg dist/index.js --targets node18-win-x64
```

测试生成的 `.exe` 文件能独立运行。

---

### Day 26-27：最终测试

在不同场景测试：
1. 新目录，无配置文件
2. 有历史记录，加载旧对话
3. 网络异常
4. 输入超长文本
5. 快速连续发送消息

---

### Day 28-30：复盘

写 `LEARNING.md` 记录：
1. TypeScript 相比 JavaScript 最大的三个好处（你自己体会到的）
2. 最难理解的三个概念
3. 最常用的类型写法（你项目中实际用到的）
4. 给同样学TS的人的建议

---

## 每周检查点

| 周次 | 必须完成 | 检查方式 |
|------|----------|----------|
| 第1周 | `npm run build` 零报错 | 运行命令 |
| 第2周 | 能跟AI正常对话 | 实际测试 |
| 第3周 | 历史记录、配置、错误处理完善 | 功能测试 |
| 第4周 | 代码有lint检查、有README、能打包 | 项目完整度 |
