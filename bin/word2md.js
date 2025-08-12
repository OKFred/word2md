#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 选择要运行的文件：优先使用编译后的 JS，否则使用 TypeScript
const distPath = join(__dirname, '..', 'dist', 'index.js');
const srcPath = join(__dirname, '..', 'src', 'index.ts');

let command, args;

if (existsSync(distPath)) {
    // 生产环境：使用编译后的 JS
    command = 'node';
    args = [distPath, ...process.argv.slice(2)];
} else {
    // 开发环境：使用 tsx 运行 TypeScript
    command = 'npx';
    args = ['tsx', srcPath, ...process.argv.slice(2)];
}

const child = spawn(command, args, {
    stdio: 'inherit',
    shell: true
});

child.on('close', (code) => {
    process.exit(code || 0);
});

child.on('error', (error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
});
