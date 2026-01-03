# 实现本地知识库自动压缩和Git忽略方案

## 方案概述
根据用户需求和参考文档，实现以下功能：
- 每次提交时自动压缩本地知识库目录（目前为`./siyuan`，后续可扩展）为`.zip`文件
- 覆盖旧的压缩包
- 提交时忽略原始目录及其压缩包（因为是本地用户数据）

## 实现步骤

### 1. 创建scripts目录和压缩脚本
- 创建`scripts`目录
- 创建`scripts/compress-knowledge-base.js`：
  - 压缩指定目录（默认为`siyuan`）为`knowledge-base.zip`
  - 支持覆盖旧压缩包
  - 支持后续扩展新目录

### 2. 更新.gitignore文件
- 添加规则忽略本地知识库目录：`siyuan/`
- 添加规则忽略生成的压缩包：`knowledge-base.zip`

### 3. 创建Git Hooks
- 创建`.git/hooks/pre-commit`脚本：
  - 在提交前执行压缩脚本
  - 确保每次提交都有最新的压缩包
  - 但不将压缩包添加到Git跟踪

### 4. 创建Hook安装脚本
- 创建`scripts/install-git-hooks.js`：
  - 自动安装和配置Git Hooks
  - 支持跨平台

## 预期效果
- 每次执行`git commit`时，自动将`siyuan`目录压缩为`knowledge-base.zip`
- 压缩包会覆盖旧版本
- `siyuan`目录和`knowledge-base.zip`都不会被Git跟踪
- 支持后续扩展新的知识库目录

## 文件清单
- `scripts/compress-knowledge-base.js` - 压缩脚本
- `scripts/install-git-hooks.js` - Hook安装脚本
- `.git/hooks/pre-commit` - 提交前自动压缩Hook
- `.gitignore` - 更新忽略规则

## 技术要点
- 使用Node.js编写跨平台脚本
- 利用Git Hooks实现自动化
- 通过`.gitignore`确保本地数据不被提交
- 支持后续扩展新的知识库目录