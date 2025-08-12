
import * as fs from "fs";
import * as path from "path";
import mammoth from "mammoth";
import TurndownService from "turndown";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ConvertOptions {
    outputDir?: string;
}

async function convertSingleDoc(docxPath: string, options: ConvertOptions = {}) {
    if (!fs.existsSync(docxPath)) {
        console.error(`Error: File not found: ${docxPath}`);
        process.exit(1);
    }

    if (!docxPath.endsWith('.docx')) {
        console.error(`Error: File must be a .docx file: ${docxPath}`);
        process.exit(1);
    }

    const inputDir = path.dirname(docxPath);
    const baseName = path.basename(docxPath, '.docx');
    const outputDir = options.outputDir || inputDir;
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outMdPath = path.join(outputDir, baseName + '.md');
    const imgDir = path.join(outputDir, 'images');
    
    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir, { recursive: true });
    }

    try {
        const result = await mammoth.convertToHtml(
            { path: docxPath },
            {
                convertImage: mammoth.images.imgElement(async (image) => {
                    const buffer = await image.read();
                    const ext = image.contentType.split("/")[1] || "png";
                    const name = `image-${uuidv4()}.${ext}`;
                    const imgPath = path.join(imgDir, name);
                    await fs.promises.writeFile(imgPath, buffer);
                    return { src: `images/${name}` };
                }),
            },
        );
        
        const markdown = new TurndownService().turndown(result.value);
        await fs.promises.writeFile(outMdPath, markdown);
        console.log(`✅ Converted: ${docxPath} → ${outMdPath}`);
        
        if (result.messages.length > 0) {
            console.log("Warnings:", result.messages.map(m => m.message).join(", "));
        }
    } catch (error) {
        console.error(`❌ Error converting ${docxPath}:`, error);
        process.exit(1);
    }
}

async function convertAllDocs(inputDir: string, options: ConvertOptions = {}) {
    if (!fs.existsSync(inputDir)) {
        console.error(`Error: Directory not found: ${inputDir}`);
        process.exit(1);
    }

    const outputDir = options.outputDir || path.join(inputDir, 'output');
    
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.docx'));
    
    if (files.length === 0) {
        console.log(`No .docx files found in directory: ${inputDir}`);
        return;
    }

    console.log(`Found ${files.length} .docx file(s) to convert...`);
    
    for (const file of files) {
        const docxPath = path.join(inputDir, file);
        const baseName = path.basename(file, '.docx');
        const outMdPath = path.join(outputDir, baseName + '.md');
        const imgDir = path.join(outputDir, 'images');
        
        if (!fs.existsSync(imgDir)) {
            fs.mkdirSync(imgDir, { recursive: true });
        }

        try {
            const result = await mammoth.convertToHtml(
                { path: docxPath },
                {
                    convertImage: mammoth.images.imgElement(async (image) => {
                        const buffer = await image.read();
                        const ext = image.contentType.split("/")[1] || "png";
                        const name = `image-${uuidv4()}.${ext}`;
                        const imgPath = path.join(imgDir, name);
                        await fs.promises.writeFile(imgPath, buffer);
                        return { src: `images/${name}` };
                    }),
                },
            );
            
            const markdown = new TurndownService().turndown(result.value);
            await fs.promises.writeFile(outMdPath, markdown);
            console.log(`✅ Converted: ${file} → ${baseName}.md`);
            
            if (result.messages.length > 0) {
                console.log("  Warnings:", result.messages.map(m => m.message).join(", "));
            }
        } catch (error) {
            console.error(`❌ Error converting ${file}:`, error);
        }
    }
}

function showHelp() {
    console.log(`
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
`);
}

function showVersion() {
    try {
        const packageJsonPath = path.join(__dirname, '..', 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        console.log(packageJson.version);
    } catch (error) {
        console.log('1.0.0'); // fallback version
    }
}

async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
        showHelp();
        return;
    }
    
    if (args.includes('-v') || args.includes('--version')) {
        showVersion();
        return;
    }
    
    const inputPath = args[0];
    let outputDir: string | undefined;
    
    // Parse output directory option
    const outputIndex = args.findIndex(arg => arg === '-o' || arg === '--output');
    if (outputIndex !== -1 && outputIndex + 1 < args.length) {
        outputDir = args[outputIndex + 1];
    }
    
    const inputAbsolutePath = path.resolve(inputPath);
    
    try {
        const stat = fs.statSync(inputAbsolutePath);
        
        if (stat.isFile()) {
            await convertSingleDoc(inputAbsolutePath, { outputDir });
        } else if (stat.isDirectory()) {
            await convertAllDocs(inputAbsolutePath, { outputDir });
        } else {
            console.error(`Error: ${inputPath} is neither a file nor a directory`);
            process.exit(1);
        }
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.error(`Error: File or directory not found: ${inputPath}`);
        } else {
            console.error(`Error: ${error.message}`);
        }
        process.exit(1);
    }
}

// 执行主函数
main().catch(console.error);
