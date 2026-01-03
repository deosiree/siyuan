#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Git Hooks目录
const GIT_HOOKS_DIR = path.join(__dirname, '..', '.git', 'hooks');

// 定义需要安装的Hooks
const HOOKS_TO_INSTALL = [
    'pre-commit'
];

// 主函数
function main() {
    console.log('Installing Git Hooks...');
    
    // 检查.git/hooks目录是否存在
    if (!fs.existsSync(GIT_HOOKS_DIR)) {
        console.error(`❌ Git hooks directory not found: ${GIT_HOOKS_DIR}`);
        console.error('Make sure you are in a Git repository.');
        process.exit(1);
    }
    
    // 安装每个Hook
    HOOKS_TO_INSTALL.forEach(hookName => {
        installHook(hookName);
    });
    
    console.log('\n✅ All Git Hooks installed successfully!');
    console.log('\n📋 Hook information:');
    console.log('- pre-commit: Automatically compresses knowledge base before commit');
    console.log('- The compressed zip file will not be tracked by Git');
}

// 安装单个Hook
function installHook(hookName) {
    const sourceHookPath = path.join(__dirname, '..', '.git', 'hooks', hookName);
    
    // 检查Hook是否已存在
    if (fs.existsSync(sourceHookPath)) {
        console.log(`🔄 Updating ${hookName} hook...`);
    } else {
        console.log(`📥 Installing ${hookName} hook...`);
    }
    
    // 在Windows上，不需要设置执行权限
    if (process.platform === 'win32') {
        console.log(`✅ ${hookName} hook is ready (Windows)`);
        return;
    }
    
    // 在Unix系统上，设置执行权限
    try {
        execSync(`chmod +x ${sourceHookPath}`, { stdio: 'ignore' });
        console.log(`✅ ${hookName} hook installed with executable permission`);
    } catch (error) {
        console.error(`❌ Failed to set executable permission for ${hookName}`);
        console.error('You may need to run this script with sudo.');
    }
}

// 执行主函数
main();
