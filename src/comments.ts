export interface CommentPatterns {
  singleLine: RegExp[];
  multiLineStart: RegExp[];
  multiLineEnd: RegExp[];
}

export const COMMENT_PATTERNS: Record<string, CommentPatterns> = {
  '.js': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.jsx': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.ts': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.tsx': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.java': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.c': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.cpp': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.cs': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.go': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.rs': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.swift': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.kt': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.php': {
    singleLine: [/^\s*\/\//, /^\s*#/],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.py': {
    singleLine: [/^\s*#/],
    multiLineStart: [/^\s*"""/, /^\s*'''/],
    multiLineEnd: [/"""\s*$/, /'''\s*$/],
  },
  '.rb': {
    singleLine: [/^\s*#/],
    multiLineStart: [/^\s*=begin/],
    multiLineEnd: [/^\s*=end/],
  },
  '.sh': {
    singleLine: [/^\s*#/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.bash': {
    singleLine: [/^\s*#/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.zsh': {
    singleLine: [/^\s*#/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.yaml': {
    singleLine: [/^\s*#/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.yml': {
    singleLine: [/^\s*#/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.toml': {
    singleLine: [/^\s*#/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.sql': {
    singleLine: [/^\s*--/],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.lua': {
    singleLine: [/^\s*--/],
    multiLineStart: [/^\s*--\[\[/],
    multiLineEnd: [/\]\]\s*$/],
  },
  '.vim': {
    singleLine: [/^\s*"/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.el': {
    singleLine: [/^\s*;/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.clj': {
    singleLine: [/^\s*;/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.ex': {
    singleLine: [/^\s*#/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.exs': {
    singleLine: [/^\s*#/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.erl': {
    singleLine: [/^\s*%/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.hs': {
    singleLine: [/^\s*--/],
    multiLineStart: [/^\s*\{-/],
    multiLineEnd: [/-\}\s*$/],
  },
  '.ml': {
    singleLine: [],
    multiLineStart: [/^\s*\(\*/],
    multiLineEnd: [/\*\)\s*$/],
  },
  '.r': {
    singleLine: [/^\s*#/],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.m': {
    singleLine: [/^\s*%/],
    multiLineStart: [/^\s*%\{/],
    multiLineEnd: [/^\s*%\}/],
  },
  '.html': {
    singleLine: [],
    multiLineStart: [/^\s*<!--/],
    multiLineEnd: [/-->\s*$/],
  },
  '.xml': {
    singleLine: [],
    multiLineStart: [/^\s*<!--/],
    multiLineEnd: [/-->\s*$/],
  },
  '.css': {
    singleLine: [],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.scss': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
  '.sass': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [],
    multiLineEnd: [],
  },
  '.less': {
    singleLine: [/^\s*\/\//],
    multiLineStart: [/^\s*\/\*/],
    multiLineEnd: [/\*\/\s*$/],
  },
};

export function countComments(lines: string[], ext: string): number {
  const patterns = COMMENT_PATTERNS[ext];
  if (!patterns) return 0;

  let commentLines = 0;
  let inMultiLineComment = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '') continue;

    if (inMultiLineComment) {
      commentLines++;
      if (patterns.multiLineEnd.some((pattern) => pattern.test(line))) {
        inMultiLineComment = false;
      }
      continue;
    }

    if (patterns.multiLineStart.some((pattern) => pattern.test(line))) {
      commentLines++;
      if (!patterns.multiLineEnd.some((pattern) => pattern.test(line))) {
        inMultiLineComment = true;
      }
      continue;
    }

    if (patterns.singleLine.some((pattern) => pattern.test(line))) {
      commentLines++;
      continue;
    }
  }

  return commentLines;
}
