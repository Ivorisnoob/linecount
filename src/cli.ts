#!/usr/bin/env node

import { resolve } from 'path';
import { LineCounter } from './counter.js';
import { ResultFormatter } from './formatter.js';
import { DEFAULT_IGNORE_DIRS, DEFAULT_IGNORE_PATTERNS } from './defaults.js';
import chalk from 'chalk';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(
    chalk.cyan.bold('\n📊 linecount') +
      chalk.gray(' - A fast, intelligent line counter\n')
  );
  console.log(chalk.white('Usage:'));
  console.log(
    chalk.gray('  linecount [path]                    ') +
      'Count lines in the specified directory'
  );
  console.log(
    chalk.gray('  linecount --exclude-dir <dir>       ') +
      'Exclude specific directories'
  );
  console.log(
    chalk.gray('  linecount --exclude-ext <ext>       ') +
      'Exclude specific file extensions'
  );
  console.log(
    chalk.gray('  linecount --help                    ') +
      'Show this help message\n'
  );
  console.log(chalk.white('Examples:'));
  console.log(
    chalk.gray('  linecount                           ') +
      'Count lines in current directory'
  );
  console.log(
    chalk.gray('  linecount ./src                     ') +
      'Count lines in src directory'
  );
  console.log(
    chalk.gray('  linecount --exclude-dir tests       ') +
      'Exclude tests directory'
  );
  console.log(
    chalk.gray('  linecount --exclude-ext .test.js    ') +
      'Exclude test files'
  );
  console.log(
    chalk.gray('  linecount --exclude-ext .md .txt    ') +
      'Exclude multiple extensions\n'
  );
  process.exit(0);
}

let targetPath = process.cwd();
const excludeDirs = new Set(DEFAULT_IGNORE_DIRS);
const excludePatterns = [...DEFAULT_IGNORE_PATTERNS];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === '--exclude-dir') {
    i++;
    while (i < args.length && !args[i].startsWith('--')) {
      excludeDirs.add(args[i]);
      i++;
    }
    i--;
  } else if (arg === '--exclude-ext') {
    i++;
    while (i < args.length && !args[i].startsWith('--')) {
      const ext = args[i];
      const pattern = new RegExp(
        ext.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'
      );
      excludePatterns.push(pattern);
      i++;
    }
    i--;
  } else if (!arg.startsWith('--')) {
    targetPath = resolve(arg);
  }
}

console.log(
  chalk.cyan('\n📊 Counting lines in: ') + chalk.white(targetPath)
);

const counter = new LineCounter({
  ignoreDirs: excludeDirs,
  ignorePatterns: excludePatterns,
});
const formatter = new ResultFormatter();

try {
  const result = await counter.count(targetPath);
  console.log(formatter.format(result));

  console.log(
    chalk.green('✓ ') + chalk.gray(`Analyzed ${result.totalFiles} files\n`)
  );
} catch (error) {
  console.error(
    chalk.red('✗ Error: ') +
      (error instanceof Error ? error.message : 'Unknown error')
  );
  process.exit(1);
}
