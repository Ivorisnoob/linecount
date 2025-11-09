# linecount

A fast, intelligent line counter that automatically ignores common build artifacts, dependencies, and version control files. Built as a modern alternative to CLOC with sensible defaults for contemporary development workflows.

## Features

- Fast recursive directory scanning with async I/O
- Smart defaults that automatically ignore build artifacts and dependencies
- Comment detection for 30+ programming languages
- Clean, colorized table output
- Works as both a CLI tool and importable library
- Configurable ignore patterns and directories
- Zero runtime dependencies

## Installation

Install globally to use as a command-line tool:

```bash
npm install -g linecount
```

Or install locally in your project:

```bash
npm install linecount
```

## Usage

### Command Line

Count lines in the current directory:
```bash
linecount
```

Count lines in a specific directory:
```bash
linecount ./src
linecount /path/to/project
```

Show help information:
```bash
linecount --help
```

### As a Library

```typescript
import { LineCounter } from 'linecount';

const counter = new LineCounter();
const result = await counter.count('./my-project');

console.log(`Total files: ${result.totalFiles}`);
console.log(`Total lines: ${result.totalLines}`);
console.log(`Code lines: ${result.totalCode}`);
console.log(`Comment lines: ${result.totalComments}`);
console.log(`Blank lines: ${result.totalBlank}`);

// Access per-extension statistics
for (const [ext, stats] of result.byExtension) {
  console.log(`${ext}: ${stats.code} lines of code`);
}
```

### Custom Configuration

```typescript
import { LineCounter } from 'linecount';

const counter = new LineCounter({
  ignoreDirs: new Set(['node_modules', 'custom-dir']),
  ignorePatterns: [/\.test\.js$/, /\.spec\.ts$/],
});

const result = await counter.count('./src');
```

## What Gets Ignored by Default

### Directories

**Package managers and dependencies:**
- node_modules, bower_components, vendor, Pods, Carthage
- .pub-cache, site-packages, __pypackages__

**Version control:**
- .git, .svn, .hg

**IDE and editor folders:**
- .idea, .vscode, .vs, .cursor, .windsurf

**Build outputs:**
- dist, build, out, target, bin, obj, Debug, Release
- DerivedData, .build, cmake-build-debug, cmake-build-release

**Test coverage:**
- coverage, .nyc_output, TestResults

**Cache directories:**
- .cache, .parcel-cache, .next, .nuxt, .turbo
- __pycache__, .pytest_cache, .mypy_cache, .ruff_cache
- .gradle, .m2, .dart_tool

**Framework-specific:**
- .terraform, .vagrant, .stack-work, .elixir_ls

### Files

**Lock files:**
- package-lock.json, yarn.lock, pnpm-lock.yaml
- Gemfile.lock, Cargo.lock, Podfile.lock, composer.lock, poetry.lock

**Minified and bundled files:**
- *.min.js, *.bundle.js, *.map

**Generated files:**
- *.generated.swift, *.g.dart, *.pb.go, *_pb2.py
- *.designer.cs, AssemblyInfo.cs

**Config and ignore files:**
- .gitignore, .gitattributes, .npmignore, .dockerignore
- .cursorignore, .cursorrules, .editorconfig

**Binary and media files:**
- Images: jpg, png, gif, svg, ico, webp
- Videos: mp4, avi, mov, wmv
- Archives: zip, tar, gz, rar, 7z
- Documents: pdf, doc, docx, xls, xlsx
- Executables: exe, dll, so, dylib, apk, ipa

## Supported Languages for Comment Detection

The tool accurately detects and counts comments in:

**C-style comments (// and /* */):**
JavaScript, TypeScript, Java, C, C++, C#, Go, Rust, Swift, Kotlin, PHP

**Hash comments (#):**
Python, Ruby, Shell scripts (bash, zsh), YAML, TOML, Perl, Elixir, R

**SQL comments (-- and /* */):**
SQL, Lua

**Other languages:**
HTML/XML, CSS/SCSS/LESS, Haskell, OCaml, Lisp, Clojure, Erlang, Vim script, MATLAB

## Output Format

The tool displays results in a clean table format:

```
Language         Files      Lines      Blank    Comment       Code
.ts                  6        450         50         80        320
.js                  3        200         25         30        145
.json                2         80          5          0         75
Total               11        730         80        110        540
```

## Why linecount?

Unlike traditional line counters, linecount is built for modern development:

- Automatically ignores everything you don't want to count
- No configuration needed for most projects
- Understands modern frameworks and tooling (Next.js, Flutter, Rust, etc.)
- Fast async I/O for large codebases
- Clean, readable output with color coding
- Can be used programmatically in Node.js applications

## Requirements

Node.js 18.0.0 or higher

## License

MIT
