import { CountResult } from './counter.js';
import Table from 'cli-table3';
import chalk from 'chalk';

export class ResultFormatter {
  format(result: CountResult): string {
    const table = new Table({
      head: [
        chalk.cyan.bold('Language'),
        chalk.cyan.bold('Files'),
        chalk.cyan.bold('Lines'),
        chalk.cyan.bold('Blank'),
        chalk.cyan.bold('Comment'),
        chalk.cyan.bold('Code'),
      ],
      style: {
        head: [],
        border: ['gray'],
      },
      colAligns: ['left', 'right', 'right', 'right', 'right', 'right'],
    });

    const sorted = Array.from(result.byExtension.entries()).sort(
      (a, b) => b[1].code - a[1].code
    );

    for (const [ext, stats] of sorted) {
      const lang = this.formatExtension(ext);
      table.push([
        chalk.white(lang),
        chalk.yellow(stats.files.toLocaleString()),
        chalk.blue(stats.lines.toLocaleString()),
        chalk.gray(stats.blank.toLocaleString()),
        chalk.magenta(stats.comments.toLocaleString()),
        chalk.green(stats.code.toLocaleString()),
      ]);
    }

    table.push([
      chalk.bold.white('Total'),
      chalk.bold.yellow(result.totalFiles.toLocaleString()),
      chalk.bold.blue(result.totalLines.toLocaleString()),
      chalk.bold.gray(result.totalBlank.toLocaleString()),
      chalk.bold.magenta(result.totalComments.toLocaleString()),
      chalk.bold.green(result.totalCode.toLocaleString()),
    ]);

    return '\n' + table.toString() + '\n';
  }

  private formatExtension(ext: string): string {
    if (ext === 'no-extension') return '(no extension)';
    return ext.startsWith('.') ? ext : `.${ext}`;
  }
}
