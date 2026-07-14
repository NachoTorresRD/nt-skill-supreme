#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const PKG_PATH = path.join(__dirname, '..', 'package.json');
let pkgVersion = '2.0.0';
try {
  const pkg = JSON.parse(fs.readFileSync(PKG_PATH, 'utf8'));
  pkgVersion = pkg.version || '2.0.0';
} catch (e) {
  // Fallback version
}

const MANIFEST_NAME = '.nt-skill-supreme-manifest.json';
const sourceDir = path.resolve(__dirname, '..');
const homeDir = os.homedir();
const cwd = process.cwd();

// Terminal Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Help Banner
function printHelp() {
  console.log(`
${colors.cyan}${colors.bright}👑 NT-SKILL SUPREME CLI v${pkgVersion}${colors.reset}
${colors.dim}The Master AI Skill Framework Installer & Manager${colors.reset}

${colors.bright}USAGE:${colors.reset}
  $ npx nt-skill-supreme <command> [options]

${colors.bright}COMMANDS:${colors.reset}
  init              Detect and install NT-SKILL SUPREME into AI environments
  status            Inspect installed version, active targets, and manifest integrity
  remove            Safely uninstall files installed by NT-SKILL SUPREME

${colors.bright}OPTIONS:${colors.reset}
  --ai <target>     Specify target environment: antigravity, claude, cursor, windsurf, trae, codex, opencode, all
  --dry-run         Simulate operation without modifying any files on disk
  --force           Overwrite existing target files (creates timestamped .bak backups)
  -h, --help        Show this help message
  -v, --version     Output CLI version

${colors.bright}EXAMPLES:${colors.reset}
  $ npx nt-skill-supreme init
  $ npx nt-skill-supreme init --ai claude --dry-run
  $ npx nt-skill-supreme init --ai cursor --force
  $ npx nt-skill-supreme status
  $ npx nt-skill-supreme remove
`);
}

// Version
function printVersion() {
  console.log(`v${pkgVersion}`);
}

// Known Environment Definitions & Detection Logic
function detectEnvironments() {
  const detected = [];
  
  // Gemini Antigravity
  const antigravityPath = path.join(homeDir, '.gemini');
  if (fs.existsSync(antigravityPath)) {
    detected.push('antigravity');
  }

  // Claude
  const claudePath = path.join(homeDir, '.claude');
  if (fs.existsSync(claudePath)) {
    detected.push('claude');
  }

  // Cursor
  const cursorLocal = path.join(cwd, '.cursor');
  if (fs.existsSync(cursorLocal) || fs.existsSync(path.join(homeDir, '.cursor'))) {
    detected.push('cursor');
  }

  // Windsurf
  if (fs.existsSync(path.join(cwd, '.windsurfrules')) || fs.existsSync(path.join(homeDir, '.codeium'))) {
    detected.push('windsurf');
  }

  // Trae
  if (fs.existsSync(path.join(cwd, '.trae')) || fs.existsSync(path.join(cwd, 'AGENTS.md'))) {
    detected.push('trae');
  }

  // Codex / OpenCode
  if (fs.existsSync(path.join(cwd, '.codex')) || fs.existsSync(path.join(cwd, '.opencode'))) {
    detected.push('codex');
  }

  return detected;
}

// Copy directory recursively
function copyDirRecursive(src, dest, dryRun, force, createdFiles, backupsCreated) {
  if (!dryRun && !fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath, dryRun, force, createdFiles, backupsCreated);
    } else {
      copyFileSafe(srcPath, destPath, dryRun, force, createdFiles, backupsCreated);
    }
  }
}

// Copy file with existence check, backup, and dry-run simulation
function copyFileSafe(srcPath, destPath, dryRun, force, createdFiles, backupsCreated) {
  const exists = fs.existsSync(destPath);

  if (exists && !force) {
    console.log(`  ${colors.yellow}⚠️  File exists: ${destPath} (Pass --force to overwrite)${colors.reset}`);
    return false;
  }

  if (exists && force) {
    const backupPath = `${destPath}.bak.${Date.now()}`;
    console.log(`  ${colors.cyan}📦 Creating backup: ${backupPath}${colors.reset}`);
    if (!dryRun) {
      fs.copyFileSync(destPath, backupPath);
      backupsCreated.push(backupPath);
    }
  }

  console.log(`  ${colors.green}✓ ${dryRun ? '[DRY-RUN] Would write' : 'Wrote'}: ${destPath}${colors.reset}`);
  if (!dryRun) {
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    createdFiles.push(destPath);
  }
  return true;
}

// Target Mapping Definition
function getTargetPaths(target) {
  const map = {
    antigravity: {
      type: 'dir',
      path: path.join(homeDir, '.gemini', 'config', 'skills', 'nt-skill-supreme')
    },
    claude: {
      type: 'dir',
      path: path.join(homeDir, '.claude', 'skills', 'nt-skill-supreme')
    },
    cursor: {
      type: 'file',
      path: path.join(cwd, '.cursor', 'rules', 'nt-skill-supreme.mdc'),
      source: path.join(sourceDir, 'AGENTS.md')
    },
    windsurf: {
      type: 'file',
      path: path.join(cwd, '.windsurfrules'),
      source: path.join(sourceDir, 'AGENTS.md')
    },
    trae: {
      type: 'file',
      path: path.join(cwd, 'AGENTS.md'),
      source: path.join(sourceDir, 'AGENTS.md')
    },
    codex: {
      type: 'file',
      path: path.join(cwd, '.codex', 'rules', 'AGENTS.md'),
      source: path.join(sourceDir, 'AGENTS.md')
    },
    opencode: {
      type: 'file',
      path: path.join(cwd, 'AGENTS.md'),
      source: path.join(sourceDir, 'AGENTS.md')
    }
  };
  return map[target];
}

// Load manifest safely
function loadManifest(manifestPath) {
  if (fs.existsSync(manifestPath)) {
    try {
      return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (e) {
      return null;
    }
  }
  return null;
}

// Main Command Handler
function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    printHelp();
    return;
  }

  if (args.includes('-v') || args.includes('--version')) {
    printVersion();
    return;
  }

  const command = args[0];
  const dryRun = args.includes('--dry-run');
  const force = args.includes('--force');

  let targetAi = null;
  const aiIdx = args.indexOf('--ai');
  if (aiIdx !== -1 && args[aiIdx + 1]) {
    targetAi = args[aiIdx + 1].toLowerCase();
  }

  const manifestPath = path.join(cwd, MANIFEST_NAME);

  if (command === 'status') {
    handleStatus(manifestPath);
    return;
  }

  if (command === 'remove') {
    handleRemove(manifestPath, dryRun);
    return;
  }

  if (command === 'init') {
    handleInit(targetAi, dryRun, force, manifestPath);
    return;
  }

  console.error(`${colors.red}Error: Unknown command "${command}". Use --help for usage.${colors.reset}`);
  process.exitCode = 1;
}

function handleStatus(manifestPath) {
  const manifest = loadManifest(manifestPath);
  if (!manifest) {
    console.log(`${colors.yellow}No active installation manifest found in this directory (${manifestPath}).${colors.reset}`);
    return;
  }

  console.log(`
${colors.cyan}${colors.bright}📋 NT-SKILL SUPREME Installation Status:${colors.reset}
  ${colors.bright}Version:${colors.reset} ${manifest.version}
  ${colors.bright}Installed At:${colors.reset} ${manifest.installedAt}
  ${colors.bright}Environments:${colors.reset} ${manifest.environments.join(', ')}
  ${colors.bright}Tracked Files (${manifest.createdFiles ? manifest.createdFiles.length : 0}):${colors.reset}
`);
  (manifest.createdFiles || []).forEach(f => {
    const exists = fs.existsSync(f);
    console.log(`    ${exists ? colors.green + '✓' : colors.red + '✗ (missing)'} ${f}${colors.reset}`);
  });

  if (manifest.backups && manifest.backups.length > 0) {
    console.log(`\n  ${colors.bright}Backups Generated (${manifest.backups.length}):${colors.reset}`);
    manifest.backups.forEach(b => console.log(`    📦 ${b}`));
  }
}

function handleRemove(manifestPath, dryRun) {
  const manifest = loadManifest(manifestPath);
  if (!manifest) {
    console.log(`${colors.yellow}No installation manifest found at ${manifestPath}. Nothing to remove.${colors.reset}`);
    return;
  }

  console.log(`${colors.yellow}${colors.bright}🗑️ Removing NT-SKILL SUPREME tracked files...${colors.reset}\n`);

  const createdFiles = manifest.createdFiles || [];
  createdFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      console.log(`  ${colors.red}${dryRun ? '[DRY-RUN] Would delete' : 'Deleted'}: ${filePath}${colors.reset}`);
      if (!dryRun) {
        fs.unlinkSync(filePath);
      }
    }
  });

  if (!dryRun) {
    fs.unlinkSync(manifestPath);
    console.log(`\n${colors.green}✓ Manifest removed. Uninstall complete.${colors.reset}`);
  } else {
    console.log(`\n${colors.cyan}[DRY-RUN] Manifest simulation complete.${colors.reset}`);
  }
}

function handleInit(targetAi, dryRun, force, manifestPath) {
  let targetsToInstall = [];

  if (targetAi === 'all') {
    targetsToInstall = ['antigravity', 'claude', 'cursor', 'windsurf', 'trae', 'codex', 'opencode'];
  } else if (targetAi) {
    const validTargets = ['antigravity', 'claude', 'cursor', 'windsurf', 'trae', 'codex', 'opencode'];
    if (!validTargets.includes(targetAi)) {
      console.error(`${colors.red}Error: Invalid target "${targetAi}". Allowed targets: ${validTargets.join(', ')}${colors.reset}`);
      process.exitCode = 1;
      return;
    }
    targetsToInstall = [targetAi];
  } else {
    // Honest Auto-detection mode
    console.log(`${colors.cyan}🔍 Auto-detecting available AI environments...${colors.reset}`);
    const detected = detectEnvironments();
    if (detected.length > 0) {
      console.log(`  ${colors.green}✓ Detected environments: ${detected.join(', ')}${colors.reset}\n`);
      targetsToInstall = detected;
    } else {
      console.log(`  ${colors.yellow}No standard local AI environment signatures detected automatically.${colors.reset}`);
      console.log(`  ${colors.dim}Please re-run specifying a target: npx nt-skill-supreme init --ai <target>${colors.reset}`);
      console.log(`  ${colors.dim}Available choices: antigravity, claude, cursor, windsurf, trae, codex, opencode, all${colors.reset}`);
      return;
    }
  }

  console.log(`${colors.cyan}${colors.bright}🚀 Installing NT-SKILL SUPREME v${pkgVersion} ${dryRun ? '[DRY-RUN MODE]' : ''}${colors.reset}\n`);

  const createdFiles = [];
  const backupsCreated = [];

  targetsToInstall.forEach(target => {
    const targetInfo = getTargetPaths(target);
    if (!targetInfo) return;

    console.log(`${colors.bright}Target: ${target.toUpperCase()}${colors.reset}`);
    if (targetInfo.type === 'dir') {
      copyDirRecursive(sourceDir, targetInfo.path, dryRun, force, createdFiles, backupsCreated);
    } else {
      copyFileSafe(targetInfo.source, targetInfo.path, dryRun, force, createdFiles, backupsCreated);
    }
    console.log('');
  });

  if (!dryRun && createdFiles.length > 0) {
    const manifestData = {
      name: 'nt-skill-supreme',
      version: pkgVersion,
      installedAt: new Date().toISOString(),
      environments: targetsToInstall,
      createdFiles: createdFiles,
      backups: backupsCreated
    };
    fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2), 'utf8');
    console.log(`${colors.green}✨ NT-SKILL SUPREME successfully installed! Manifest saved to ${manifestPath}${colors.reset}`);
  } else if (dryRun) {
    console.log(`${colors.cyan}✨ [DRY-RUN] Simulation complete. No files were modified.${colors.reset}`);
  } else {
    console.log(`${colors.yellow}No files written. Target files already exist. Use --force to overwrite.${colors.reset}`);
  }
}

// Run CLI
try {
  main();
} catch (err) {
  console.error(`${colors.red}❌ Unexpected Error: ${err.message}${colors.reset}`);
  process.exitCode = 1;
}
