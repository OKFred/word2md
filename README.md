# word2md

> 📖 [中文文档 (Chinese Documentation)](https://github.com/OKFred/word2md/blob/master/README_zhCN.md)

A simple and easy-to-use command-line tool for converting Microsoft Word documents (.docx) to Markdown format with automatic image extraction and saving.

## Features

- 🚀 Support for single file and batch conversion
- 📸 Automatic extraction and saving of images from documents
- 📝 Preserves original document formatting structure
- 🎯 Simple command-line interface
- 📦 Support for npx one-click execution without installation

## Installation

### Using npx (Recommended)
No installation required, run directly:
```bash
npx word2md <input> [options]
```

### Global Installation
```bash
npm install -g word2md
```

### Local Installation
```bash
npm install word2md
```

## Usage

### Basic Usage

#### Convert Single File
```bash
# Generate markdown file in the same directory as the source file
npx word2md document.docx

# Specify output directory
npx word2md document.docx -o ./output
```

#### Batch Convert Directory
```bash
# Convert all .docx files in directory to output subdirectory
npx word2md ./docs

# Specify output directory
npx word2md ./docs -o ./converted
```

### Command Line Options

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

## Output Structure

The converted file structure is as follows:

```
output/
├── document.md          # Converted Markdown file
└── images/             # Extracted images directory
    ├── image-uuid1.png
    ├── image-uuid2.jpg
    └── ...
```

- Image references in Markdown files are automatically updated to relative paths: `images/image-uuid.ext`
- Image filenames use UUIDs to ensure uniqueness
- Supports common image formats: PNG, JPG, JPEG, GIF, etc.

## Examples

### Convert Single File
```bash
$ npx word2md report.docx
✅ Converted: D:\docs\report.docx → D:\docs\report.md
```

### Batch Convert
```bash
$ npx word2md ./documents
Found 3 .docx file(s) to convert...
✅ Converted: report1.docx → report1.md
✅ Converted: report2.docx → report2.md
✅ Converted: manual.docx → manual.md
```

### Specify Output Directory
```bash
$ npx word2md report.docx -o ./markdown
✅ Converted: D:\docs\report.docx → D:\markdown\report.md
```

## Technical Implementation

This tool is built with the following tech stack:

- **mammoth**: For parsing .docx files and extracting content and images
- **turndown**: For converting HTML to Markdown
- **uuid**: For generating unique image filenames
- **TypeScript**: Type-safe development experience
- **Node.js**: Cross-platform runtime environment

## System Requirements

- Node.js >= 16.0.0
- Supports Windows, macOS, Linux

## Development

### Clone the Project
```bash
git clone https://github.com/okfred/word2md.git
cd word2md
```

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Test
```bash
npm test
```

## Contributing

Issues and Pull Requests are welcome!

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0
- 🎉 Initial release
- ✨ Support for single file and batch conversion
- 📸 Automatic image extraction and saving
- 🚀 Support for npx one-click execution

## FAQ

### Q: What file formats are supported?
A: Currently only supports .docx format. Legacy .doc format is not supported.

### Q: Will image quality be lost?
A: No. Images are saved at original quality without any compression or processing.

### Q: Can password-protected documents be converted?
A: Currently, password-protected .docx files are not supported.

### Q: What to do when encountering memory issues with large files?
A: For particularly large files, consider increasing Node.js memory limit:
```bash
node --max-old-space-size=4096 $(which npx) word2md large-file.docx
```

## Related Projects

- [mammoth.js](https://github.com/mwilliamson/mammoth.js) - .docx to HTML converter
- [turndown](https://github.com/domchristie/turndown) - HTML to Markdown converter

---

If this tool helps you, please give it a ⭐️ for support!
