#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('\x1b[36m%s\x1b[0m', '👑 NT-SKILL SUPREME: Universal AI Skill Installer');
console.log('\x1b[90m%s\x1b[0m', '────────────────────────────────────────────────────');

const sourceDir = path.join(__dirname, '..');
const homeDir = os.homedir();
const cwd = process.cwd();

// Parse Command Line Arguments
const args = process.argv.slice(2);
let targetAi = 'all';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--ai' && args[i + 1]) {
    targetAi = args[i + 1].toLowerCase();
  }
}

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      if (file === '.git' || file === 'node_modules') return;
      const curSource = path.join(source, file);
      const curTarget = path.join(target, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}

const installMap = {
  antigravity: [
    path.join(homeDir, '.gemini', 'config', 'skills', 'nt-skill-supreme')
  ],
  claude: [
    path.join(homeDir, '.claude', 'skills', 'nt-skill-supreme')
  ],
  cursor: [
    path.join(cwd, '.cursor', 'rules', 'nt-skill-supreme.mdc')
  ],
  windsurf: [
    path.join(cwd, '.windsurfrules')
  ],
  trae: [
    path.join(cwd, 'AGENTS.md')
  ]
};

try {
  if (targetAi === 'all') {
    console.log('\x1b[33m%s\x1b[0m', '🚀 Deploying NT-SKILL SUPREME to ALL AI Environments...\n');
    
    // Antigravity & Claude full skill copy
    copyFolderRecursiveSync(sourceDir, installMap.antigravity[0]);
    console.log('\x1b[32m%s\x1b[0m', `  ✓ [Antigravity] Installed to: ${installMap.antigravity[0]}`);
    
    copyFolderRecursiveSync(sourceDir, installMap.claude[0]);
    console.log('\x1b[32m%s\x1b[0m', `  ✓ [Claude Code] Installed to: ${installMap.claude[0]}`);

    // Cursor rule copy
    const cursorDir = path.dirname(installMap.cursor[0]);
    if (!fs.existsSync(cursorDir)) fs.mkdirSync(cursorDir, { recursive: true });
    fs.copyFileSync(path.join(sourceDir, 'AGENTS.md'), installMap.cursor[0]);
    console.log('\x1b[32m%s\x1b[0m', `  ✓ [Cursor] MDC Rule deployed to: ${installMap.cursor[0]}`);

    // Windsurf rule copy
    fs.copyFileSync(path.join(sourceDir, 'AGENTS.md'), installMap.windsurf[0]);
    console.log('\x1b[32m%s\x1b[0m', `  ✓ [Windsurf] Rule deployed to: ${installMap.windsurf[0]}`);

    // Trae & Codex AGENTS.md copy
    fs.copyFileSync(path.join(sourceDir, 'AGENTS.md'), installMap.trae[0]);
    console.log('\x1b[32m%s\x1b[0m', `  ✓ [Trae/Codex] Rule deployed to: ${installMap.trae[0]}`);

  } else if (installMap[targetAi]) {
    console.log('\x1b[33m%s\x1b[0m', `🚀 Deploying NT-SKILL SUPREME to [${targetAi.toUpperCase()}]...\n`);
    if (targetAi === 'antigravity' || targetAi === 'claude') {
      copyFolderRecursiveSync(sourceDir, installMap[targetAi][0]);
      console.log('\x1b[32m%s\x1b[0m', `  ✓ Installed to: ${installMap[targetAi][0]}`);
    } else {
      const parentDir = path.dirname(installMap[targetAi][0]);
      if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
      fs.copyFileSync(path.join(sourceDir, 'AGENTS.md'), installMap[targetAi][0]);
      console.log('\x1b[32m%s\x1b[0m', `  ✓ Rule deployed to: ${installMap[targetAi][0]}`);
    }
  } else {
    console.log('\x1b[31m%s\x1b[0m', `Unknown AI target "${targetAi}". Supported targets: antigravity, claude, cursor, windsurf, trae, opencode, all.`);
  }

  console.log('\n\x1b[35m%s\x1b[0m', '✨ NT-SKILL SUPREME Deployment Complete! Enjoy Elite Design Intelligence.');
} catch (err) {
  console.error('\x1b[31m%s\x1b[0m', `❌ Installation error: ${err.message}`);
}
