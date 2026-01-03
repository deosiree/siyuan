#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// 配置：需要压缩的目录列表（后续可扩展）
const KNOWLEDGE_BASE_DIRS = [
    'sieyuan' // 当前的本地知识库目录（注意：实际目录名是sieyuan，不是siyuan）
];

// 压缩包输出路径
const OUTPUT_ZIP = 'knowledge-base.zip';

// 检查archiver依赖
function checkDependencies() {
    try {
        require('archiver');
        return true;
    } catch (e) {
        console.error('Error: archiver library not found. Please install it with:');
        console.error('npm install -g archiver');
        return false;
    }
}

// 压缩知识库目录
function compressKnowledgeBase() {
    console.log('Compressing knowledge base directories...');
    
    // 创建输出流
    const output = fs.createWriteStream(OUTPUT_ZIP);
    const archive = archiver('zip', {
        zlib: { level: 9 } // 最高压缩级别
    });
    
    // 监听事件
    output.on('close', () => {
        console.log(`✓ Compressed ${archive.pointer()} total bytes`);
        console.log(`✓ Created ${OUTPUT_ZIP}`);
    });
    
    archive.on('error', (err) => {
        throw err;
    });
    
    // 管道连接
    archive.pipe(output);
    
    // 添加需要压缩的目录
    KNOWLEDGE_BASE_DIRS.forEach(dir => {
        if (fs.existsSync(dir)) {
            console.log(`- Adding directory: ${dir}`);
            archive.directory(dir, dir);
        } else {
            console.log(`- Skipping non-existent directory: ${dir}`);
        }
    });
    
    // 完成压缩
    archive.finalize();
}

// 主函数
function main() {
    if (!checkDependencies()) {
        process.exit(1);
    }
    
    // 检查并删除旧的压缩包
    if (fs.existsSync(OUTPUT_ZIP)) {
        console.log(`Removing old ${OUTPUT_ZIP}...`);
        fs.unlinkSync(OUTPUT_ZIP);
    }
    
    // 执行压缩
    compressKnowledgeBase();
}

// 执行主函数
main();
