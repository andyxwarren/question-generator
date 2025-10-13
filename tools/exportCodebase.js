/**
 * ────────────────────────────────────────────────────────────────────────────────
 * 🧰 Codebase Export Tool (Pure JavaScript)
 * ────────────────────────────────────────────────────────────────────────────────
 *
 * Description:
 * Recursively scans your project directory, collecting each file’s:
 *   - Relative path
 *   - File type (extension)
 *   - File contents (for text-based files)
 * Then exports everything to `codebase_dump.md` in your project root.
 *
 * ────────────────────────────────────────────────────────────────────────────────
 * 🚀 Usage:
 *   node tools/exportCodebase.js
 *
 * ────────────────────────────────────────────────────────────────────────────────
 * ⚙️ Configuration:
 * - Edit `ignoreFolders` and `ignoreFiles` below to exclude files/folders.
 * - Wildcards like "*.md" are supported.
 * - Existing output file is automatically overwritten.
 * ────────────────────────────────────────────────────────────────────────────────
 */

const fs = require("fs");
const path = require("path");

/**
 * Simple wildcard matcher: supports patterns like "*.md" or "config.*"
 */
function matchesPattern(filename, pattern) {
  if (!pattern.includes("*")) {
    return filename === pattern || filename.endsWith(pattern);
  }
  // Escape regex special chars except for '*'
  const regexPattern = "^" + pattern.split("*").map(escapeRegex).join(".*") + "$";
  return new RegExp(regexPattern).test(filename);
}

function escapeRegex(str) {
  return str.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Recursively walks through a directory and returns all file paths.
 */
function walkDir(dir, ignoreFolders, ignoreFiles) {
  let results = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const relPath = path.relative(process.cwd(), filePath);

    // Skip ignored folders
    if (ignoreFolders.some((pattern) => relPath.includes(pattern))) continue;

    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(walkDir(filePath, ignoreFolders, ignoreFiles));
    } else {
      // Skip ignored files (supports wildcards)
      if (ignoreFiles.some((pattern) => matchesPattern(file, pattern))) continue;
      results.push(filePath);
    }
  }

  return results;
}

/**
 * Detects the file type (extension).
 */
function getFileType(filePath) {
  const ext = path.extname(filePath);
  return ext ? ext.slice(1) : "unknown";
}

/**
 * Exports project structure and contents to a Markdown file.
 */
function exportCodebase(rootDir) {
  // ─── CONFIGURATION ─────────────────────────────────────────────────────────────
  const ignoreFolders = [
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    ".vscode",
    "coverage",
    "__pycache__",
    ".idea",
    "env",
    "tools",
    "archive",
    ".claude",
    "references"
  ];

  const ignoreFiles = [
    ".DS_Store",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    ".env",
    "codebase_dump.md", // ✅ exclude markdown files
    'gitignore',
    "*.md", // ✅ exclude markdown files
    "*.png"
  ];

  const outputFilename = "codebase_dump.md";
  // ───────────────────────────────────────────────────────────────────────────────

  const outputPath = path.join(rootDir, outputFilename);

  // ✅ Ensure old file is removed first (to guarantee overwrite)
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }

  console.log("🔍 Scanning project...");
  const files = walkDir(rootDir, ignoreFolders, ignoreFiles);

  const markdown = [];
  markdown.push(`# 🧾 Codebase Export`);
  markdown.push(`_Generated on ${new Date().toLocaleString()}_`);
  markdown.push(``);
  markdown.push(`**Total files included:** ${files.length}`);
  markdown.push(``);

  for (const file of files) {
    const relativePath = path.relative(rootDir, file);
    const fileType = getFileType(file);

    let content = "";
    try {
      content = fs.readFileSync(file, "utf8");
    } catch {
      content = "[Non-text or unreadable file]";
    }

    markdown.push(`---`);
    markdown.push(`### \`${relativePath}\``);
    markdown.push(`**Type:** ${fileType}`);
    markdown.push("");
    markdown.push("```" + fileType);
    markdown.push(content);
    markdown.push("```");
    markdown.push("");
  }

  fs.writeFileSync(outputPath, markdown.join("\n"), "utf8");
  console.log(`✅ Export complete: ${outputPath}`);
}

// Run the export
exportCodebase(process.cwd());
