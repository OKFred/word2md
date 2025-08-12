
import * as fs from "fs";
import * as path from "path";
import mammoth from "mammoth";
import TurndownService from "turndown";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertDocx(docxPath: string) {

    // outDir: 输出 markdown 的目录
    // imgDir: 输出图片的目录
    const outDir = path.dirname(docxPath);
    const imgDir = path.join(outDir, "images");
    if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

    const result = await mammoth.convertToHtml(
        { path: docxPath },
        {
            convertImage: mammoth.images.imgElement(async (image) => {
                const buffer = await image.read();
                const ext = image.contentType.split("/")[1];
                const name = `image-${uuidv4()}.${ext}`;
                const imgPath = path.join(imgDir, name);
                await fs.promises.writeFile(imgPath, buffer);
                return { src: `images/${name}` };
            }),
        },
    );

    const markdown = new TurndownService().turndown(result.value);
    return markdown;
}

async function convertAllDocs(inputDir: string, outputDir: string) {
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.docx'));
    for (const file of files) {
        const docxPath = path.join(inputDir, file);
        const baseName = path.basename(file, '.docx');
        const outMdPath = path.join(outputDir, baseName + '.md');
        const imgDir = path.join(outputDir, 'images');
        if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

        const result = await mammoth.convertToHtml(
            { path: docxPath },
            {
                convertImage: mammoth.images.imgElement(async (image) => {
                    const buffer = await image.read();
                    const ext = image.contentType.split("/")[1];
                    const name = `image-${uuidv4()}.${ext}`;
                    const imgPath = path.join(imgDir, name);
                    await fs.promises.writeFile(imgPath, buffer);
                    return { src: `images/${name}` };
                }),
            },
        );
        const markdown = new TurndownService().turndown(result.value);
        await fs.promises.writeFile(outMdPath, markdown);
        console.log(`Converted: ${docxPath} → ${outMdPath} (images in images/)`);
    }
}


const inputDir = path.resolve(__dirname, '../user/doc');
const outputDir = path.resolve(__dirname, '../user/output');
convertAllDocs(inputDir, outputDir).catch(console.error);
