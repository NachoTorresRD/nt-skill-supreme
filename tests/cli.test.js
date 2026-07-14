const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execSync } = require('node:child_process');

const CLI_PATH = path.resolve(__dirname, '..', 'bin', 'cli.js');

describe('NT-SKILL SUPREME CLI Test Suite', () => {
  let tempCwd;
  let tempHome;

  beforeEach(() => {
    // Isolated temporary directories for home and working directory
    tempCwd = fs.mkdtempSync(path.join(os.tmpdir(), 'nt-skill-cwd-'));
    tempHome = fs.mkdtempSync(path.join(os.tmpdir(), 'nt-skill-home-'));
  });

  afterEach(() => {
    // Clean up temporary test directories
    if (fs.existsSync(tempCwd)) fs.rmSync(tempCwd, { recursive: true, force: true });
    if (fs.existsSync(tempHome)) fs.rmSync(tempHome, { recursive: true, force: true });
  });

  function runCli(argsStr) {
    const command = `node "${CLI_PATH}" ${argsStr}`;
    const env = { ...process.env, HOME: tempHome, USERPROFILE: tempHome };
    try {
      const stdout = execSync(command, { cwd: tempCwd, env, encoding: 'utf8', stdio: 'pipe' });
      return { code: 0, stdout, stderr: '' };
    } catch (err) {
      return { code: err.status || 1, stdout: err.stdout || '', stderr: err.stderr || err.message };
    }
  }

  test('CLI --version outputs correct version string', () => {
    const res = runCli('--version');
    assert.equal(res.code, 0);
    assert.match(res.stdout, /^v2\.0\.0/);
  });

  test('CLI --help outputs usage banner', () => {
    const res = runCli('--help');
    assert.equal(res.code, 0);
    assert.match(res.stdout, /NT-SKILL SUPREME CLI/);
    assert.match(res.stdout, /COMMANDS:/);
  });

  test('CLI init --ai claude performs clean installation and writes manifest', () => {
    const res = runCli('init --ai claude');
    assert.equal(res.code, 0);
    assert.match(res.stdout, /Target: CLAUDE/);

    const manifestPath = path.join(tempCwd, '.nt-skill-supreme-manifest.json');
    assert.equal(fs.existsSync(manifestPath), true);

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.equal(manifest.name, 'nt-skill-supreme');
    assert.deepEqual(manifest.environments, ['claude']);
    assert.ok(manifest.createdFiles.length > 0);
  });

  test('CLI init --dry-run simulates operation without writing files or manifest', () => {
    const res = runCli('init --ai antigravity --dry-run');
    assert.equal(res.code, 0);
    assert.match(res.stdout, /DRY-RUN MODE/);

    const manifestPath = path.join(tempCwd, '.nt-skill-supreme-manifest.json');
    assert.equal(fs.existsSync(manifestPath), false);
  });

  test('CLI init refuses silent overwrite without --force flag', () => {
    const cursorFile = path.join(tempCwd, '.cursor', 'rules', 'nt-skill-supreme.mdc');
    fs.mkdirSync(path.dirname(cursorFile), { recursive: true });
    fs.writeFileSync(cursorFile, '// Original User Content', 'utf8');

    const res = runCli('init --ai cursor');
    assert.equal(res.code, 0);
    assert.match(res.stdout, /File exists/);

    // User content remains untouched
    const content = fs.readFileSync(cursorFile, 'utf8');
    assert.equal(content, '// Original User Content');
  });

  test('CLI init --force overwrites file and creates timestamped backup', () => {
    const cursorFile = path.join(tempCwd, '.cursor', 'rules', 'nt-skill-supreme.mdc');
    fs.mkdirSync(path.dirname(cursorFile), { recursive: true });
    fs.writeFileSync(cursorFile, '// Original User Content', 'utf8');

    const res = runCli('init --ai cursor --force');
    assert.equal(res.code, 0);
    assert.match(res.stdout, /Creating backup/);

    // Overwritten content updated
    const newContent = fs.readFileSync(cursorFile, 'utf8');
    assert.notEqual(newContent, '// Original User Content');

    // Backup exists
    const files = fs.readdirSync(path.dirname(cursorFile));
    const backupFile = files.find(f => f.includes('.bak.'));
    assert.ok(backupFile);
  });

  test('CLI status reports installation details correctly', () => {
    runCli('init --ai windsurf');
    const res = runCli('status');
    assert.equal(res.code, 0);
    assert.match(res.stdout, /Installation Status/);
    assert.match(res.stdout, /windsurf/);
  });

  test('CLI remove deletes only tracked files and manifest', () => {
    runCli('init --ai trae');
    const targetFile = path.join(tempCwd, 'AGENTS.md');
    assert.equal(fs.existsSync(targetFile), true);

    const res = runCli('remove');
    assert.equal(res.code, 0);
    assert.equal(fs.existsSync(targetFile), false);
    assert.equal(fs.existsSync(path.join(tempCwd, '.nt-skill-supreme-manifest.json')), false);
  });

  test('CLI init with invalid AI target returns error exit code 1', () => {
    const res = runCli('init --ai invalid_target');
    assert.equal(res.code, 1);
    assert.match(res.stderr, /Invalid target "invalid_target"/);
  });
});
