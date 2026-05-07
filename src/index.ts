import { createMessage } from "./utils.js";
import { loadConfig, saveConfig } from "./config.js";
import type { ChatConfig } from "./types.js";

const config = loadConfig()
console.log('Config loaded:', config.model)

const msg = createMessage('user', 'Hello')
console.log(msg)

