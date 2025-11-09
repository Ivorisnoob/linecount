import { readdir, readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
import {
  DEFAULT_IGNORE_DIRS,
  DEFAULT_IGNORE_PATTERNS,
  BINARY_EXTENSIONS,
} from './defaults.js';
import { countComments } from './comments.js';

export interface CountResult {
  totalFiles: number;
  totalLines: number;
  totalBlank: number;
  totalCode: number;
  totalComments: number;
  byExtension: Map<string, ExtensionStats>;
}

export interface ExtensionStats {
  files: number;
  lines: number;
  blank: number;
  code: number;
  comments: number;
}

export interface CountOptions {
  ignoreDirs?: Set<string>;
  ignorePatterns?: RegExp[];
}

export class LineCounter {
  private ignoreDirs: Set<string>;
  private ignorePatterns: RegExp[];

  constructor(options: CountOptions = {}) {
    this.ignoreDirs = options.ignoreDirs || DEFAULT_IGNORE_DIRS;
    this.ignorePatterns = options.ignorePatterns || DEFAULT_IGNORE_PATTERNS;
  }

  async count(rootPath: string): Promise<CountResult> {
    const result: CountResult = {
      totalFiles: 0,
      totalLines: 0,
      totalBlank: 0,
      totalCode: 0,
      totalComments: 0,
      byExtension: new Map(),
    };

    await this.processDirectory(rootPath, result);
    return result;
  }

  private async processDirectory(dirPath: string, result: CountResult): Promise<void> {
    const entries = await readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);

      if (entry.isDirectory()) {
        if (!this.ignoreDirs.has(entry.name)) {
          await this.processDirectory(fullPath, result);
        }
      } else if (entry.isFile()) {
        if (this.shouldCountFile(entry.name)) {
          await this.processFile(fullPath, result);
        }
      }
    }
  }

  private shouldCountFile(filename: string): boolean {
    const ext = extname(filename).slice(1);
    
    if (BINARY_EXTENSIONS.has(ext)) {
      return false;
    }

    for (const pattern of this.ignorePatterns) {
      if (pattern.test(filename)) {
        return false;
      }
    }

    return true;
  }

  private async processFile(
    filePath: string,
    result: CountResult
  ): Promise<void> {
    try {
      const content = await readFile(filePath, 'utf-8');
      const lines = content.split('\n');
      const blankLines = lines.filter((line) => line.trim() === '').length;

      const ext = extname(filePath) || 'no-extension';
      const commentLines = countComments(lines, ext);
      const codeLines = lines.length - blankLines - commentLines;

      if (!result.byExtension.has(ext)) {
        result.byExtension.set(ext, {
          files: 0,
          lines: 0,
          blank: 0,
          code: 0,
          comments: 0,
        });
      }

      const stats = result.byExtension.get(ext)!;
      stats.files++;
      stats.lines += lines.length;
      stats.blank += blankLines;
      stats.code += codeLines;
      stats.comments += commentLines;

      result.totalFiles++;
      result.totalLines += lines.length;
      result.totalBlank += blankLines;
      result.totalCode += codeLines;
      result.totalComments += commentLines;
    } catch (error) {}
  }
}
