# word2md

一个简单易用的命令行工具，用于将 Microsoft Word 文档 (.docx) 转换为 Markdown 格式，并自动提取和保存图片。

## 特性

- 🚀 支持单个文件和批量转换
- 📸 自动提取并保存文档中的图片
- 📝 保持文档原有格式结构
- 🎯 简单的命令行界面
- 📦 支持 npx 一键运行，无需安装

## 安装

### 使用 npx (推荐)
无需安装，直接运行：
```bash
npx word2md <input> [options]
```

### 全局安装
```bash
npm install -g word2md
```

### 本地安装
```bash
npm install word2md
```

## 使用方法

### 基本用法

#### 转换单个文件
```bash
# 在文件同目录下生成 markdown 文件
npx word2md document.docx

# 指定输出目录
npx word2md document.docx -o ./output
```

#### 批量转换目录
```bash
# 转换目录下所有 .docx 文件到 output 子目录
npx word2md ./docs

# 指定输出目录
npx word2md ./docs -o ./converted
```

### 命令行选项

```
word2md - Convert Word documents (.docx) to Markdown

Usage:
  npx word2md <input> [options]

Arguments:
  <input>    Path to a .docx file or directory containing .docx files

Options:
  -o, --output <dir>    Output directory (default: same as input for files, ./output for directories)
  -h, --help           Show this help message
  -v, --version        Show version

Examples:
  npx word2md document.docx                    # Convert single file
  npx word2md ./docs                          # Convert all .docx files in directory
  npx word2md document.docx -o ./markdown     # Convert to specific output directory
  npx word2md ./docs -o ./converted           # Batch convert to specific directory
```

## 输出结构

转换后的文件结构如下：

```
output/
├── document.md          # 转换后的 Markdown 文件
└── images/             # 提取的图片目录
    ├── image-uuid1.png
    ├── image-uuid2.jpg
    └── ...
```

- Markdown 文件中的图片引用会自动更新为相对路径：`images/image-uuid.ext`
- 图片文件名使用 UUID 确保唯一性
- 支持常见图片格式：PNG, JPG, JPEG, GIF 等

## 示例

### 转换单个文件
```bash
$ npx word2md report.docx
✅ Converted: D:\docs\report.docx → D:\docs\report.md
```

### 批量转换
```bash
$ npx word2md ./documents
Found 3 .docx file(s) to convert...
✅ Converted: report1.docx → report1.md
✅ Converted: report2.docx → report2.md
✅ Converted: manual.docx → manual.md
```

### 指定输出目录
```bash
$ npx word2md report.docx -o ./markdown
✅ Converted: D:\docs\report.docx → D:\markdown\report.md
```

## 技术实现

本工具基于以下技术栈：

- **mammoth**: 用于解析 .docx 文件并提取内容和图片
- **turndown**: 用于将 HTML 转换为 Markdown
- **uuid**: 用于生成唯一的图片文件名
- **TypeScript**: 类型安全的开发体验
- **Node.js**: 跨平台运行环境

## 系统要求

- Node.js >= 16.0.0
- 支持 Windows、macOS、Linux

## 开发

### 克隆项目
```bash
git clone https://github.com/okfred/word2md.git
cd word2md
```

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

### 测试
```bash
npm test
```

## 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目使用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 更新日志

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持单文件和批量转换
- 📸 自动图片提取和保存
- 🚀 支持 npx 一键运行

## 常见问题

### Q: 支持哪些文件格式？
A: 目前只支持 .docx 格式。不支持老版本的 .doc 格式。

### Q: 图片质量会损失吗？
A: 不会。图片以原始质量保存，不进行任何压缩或处理。

### Q: 可以转换受密码保护的文档吗？
A: 目前不支持受密码保护的 .docx 文件。

### Q: 转换大文件时出现内存问题怎么办？
A: 对于特别大的文件，建议增加 Node.js 的内存限制：
```bash
node --max-old-space-size=4096 $(which npx) word2md large-file.docx
```

## 相关项目

- [mammoth.js](https://github.com/mwilliamson/mammoth.js) - .docx 到 HTML 转换器
- [turndown](https://github.com/domchristie/turndown) - HTML 到 Markdown 转换器

---

如果这个工具对你有帮助，请给个 ⭐️ 支持一下！
