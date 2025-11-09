#!/usr/bin/env node

import { resolve } from 'path';
import { LineCounter } from './counter.js';
import { ResultFormatter } from './formatter.js';
import chalk from 'chalk';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(chalk.cyan.bold('\n📊 linecount') + chalk.gray(' - A fast, intelligent line counter\n'));
  console.log(chalk.white('Usage:'));
  console.log(chalk.gray('  linecount [path]           ') + 'Count lines in the specified directory');
  console.log(chalk.gray('  linecount                  ') + 'Count lines in the current directory');
  console.log(chalk.gray('  linecount --help           ') + 'Show this help message\n');
  console.log(chalk.white('Examples:'));
  console.log(chalk.gray('  linecount                  ') + 'Count lines in current directory');
  console.log(chalk.gray('  linecount ./src            ') + 'Count lines in src directory');
  console.log(chalk.gray('  linecount /path/to/project ') + 'Count lines in specific project\n');
  process.exit(0);
}

const targetPath = args[0] ? resolve(args[0]) : process.cwd();

console.log(chalk.cyan('\n📊 Counting lines in: ') + chalk.white(targetPath));

const counter = new LineCounter();
const formatter = new ResultFormatter();

try {
  const result = await counter.count(targetPath);
  console.log(formatter.format(result));
  
  console.log(chalk.green('✓ ') + chalk.gray(`Analyzed ${result.totalFiles} files\n`));
} catch (error) {
  console.error(chalk.red('✗ Error: ') + (error instanceof Error ? error.message : 'Unknown error'));
  process.exit(1);
}
