# 使用示例

这个目录包含 word2md 工具的使用示例。

## 基本用法

### 1. 转换单个文件
```bash
# 转换单个 docx 文件
npx word2md example.docx

# 输出将保存在同目录下的 example.md 和 images/ 文件夹
```

### 2. 转换目录中的所有文件
```bash
# 转换当前目录所有 docx 文件
npx word2md ./

# 输出将保存在 output/ 子目录
```

### 3. 指定输出目录
```bash
# 指定输出目录
npx word2md example.docx -o ./converted

# 批量转换并指定输出目录
npx word2md ./ -o ./all-converted
```

## 输出结构

转换完成后，你将看到如下结构：

```
output/
├── document.md          # 转换后的 Markdown 文件
└── images/             # 提取的图片目录
    ├── image-uuid1.png
    ├── image-uuid2.jpg
    └── ...
```

## 注意事项

- 只支持 `.docx` 格式文件
- 图片会自动提取并保存为独立文件
- Markdown 中的图片引用使用相对路径
- 支持中文文件名和路径
