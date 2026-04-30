# AI Chat CLI

命令行 AI 聊天工具，支持多轮对话、本地历史记录与配置管理。

## 功能特性

- **多轮对话**：与 AI 进行连续的上下文对话
- **本地历史记录**：对话内容本地保存，随时查阅
- **配置管理**：灵活的参数与配置项管理
- **流式输出**：实时获取 AI 响应，提升交互体验

## 技术栈

- TypeScript
- Node.js (ES Module)

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建

```bash
npm run build
```

## 项目结构

```
.
├── src/
│   └── index.ts          # 入口文件
├── package.json
├── tsconfig.json
└── README.md
```

## 开发计划

- [ ] 接入 AI API
- [ ] 实现多轮对话上下文管理
- [ ] 本地历史记录存储
- [ ] 配置文件支持
- [ ] 流式输出实现

## License

ISC
