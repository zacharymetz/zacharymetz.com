#!/usr/bin/env node

/**
 * Build script for SSR Frontend
 * 
 * This script:
 * 1. Runs the Vite client build
 * 2. Runs the Vite server build
 * 3. Copies all posts except example-post.md to dist/posts
 * 
 * @file build.js
 * @author SSR Frontend Build System
 */

import { execSync } from 'child_process';
import { readdirSync, copyFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { performance } from 'perf_hooks';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

/**
 * Logs a colored message to the console
 * @param {string} message - The message to log
 * @param {string} color - The color code to use
 */
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

/**
 * Gets the current directory path (ESM compatible)
 * @returns {string} The directory path
 */
function getCurrentDir() {
  return dirname(fileURLToPath(import.meta.url));
}

/**
 * Checks current memory usage and updates max if needed
 * @param {Object} memoryTracker - Object tracking max memory usage
 */
function checkMemory(memoryTracker) {
  const memUsage = process.memoryUsage();
  const heapUsedMB = memUsage.heapUsed / 1024 / 1024;
  
  if (heapUsedMB > memoryTracker.maxHeapUsedMB) {
    memoryTracker.maxHeapUsedMB = heapUsedMB;
  }
}

/**
 * Formats bytes to human-readable format
 * @param {number} bytes - Bytes to format
 * @returns {string} Formatted string
 */
function formatBytes(bytes) {
  const mb = bytes / 1024 / 1024;
  if (mb < 1024) {
    return `${mb.toFixed(2)} MB`;
  }
  return `${(mb / 1024).toFixed(2)} GB`;
}

/**
 * Formats milliseconds to human-readable time
 * @param {number} ms - Milliseconds to format
 * @returns {string} Formatted string
 */
function formatTime(ms) {
  if (ms < 1000) {
    return `${ms.toFixed(0)}ms`;
  }
  const seconds = ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(2)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(2);
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Runs a shell command and logs the output
 * @param {string} command - The command to execute
 * @param {string} stepName - The name of the build step
 * @param {string} stepColor - The color for this step
 * @param {Object} memoryTracker - Object tracking max memory usage
 */
function runCommand(command, stepName, stepColor, memoryTracker) {
  log(`\n${colors.bright}${stepName}${colors.reset}`, stepColor);
  
  // Check memory before command
  checkMemory(memoryTracker);
  
  try {
    execSync(command, { stdio: 'inherit', cwd: getCurrentDir() });
    
    // Check memory after command
    checkMemory(memoryTracker);
    
    log(`✓ ${stepName} completed successfully`, colors.green);
  } catch (error) {
    log(`✗ ${stepName} failed`, colors.red);
    process.exit(1);
  }
}

/**
 * Recursively copies a directory
 * @param {string} sourceDir - Source directory
 * @param {string} destDir - Destination directory
 * @param {Object} memoryTracker - Object tracking max memory usage
 * @returns {number} Number of files copied
 */
function copyDirectory(sourceDir, destDir, memoryTracker) {
  // Ensure destination directory exists
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }
  
  const entries = readdirSync(sourceDir);
  let copiedCount = 0;
  
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const sourcePath = join(sourceDir, entry);
    const destPath = join(destDir, entry);
    const stat = statSync(sourcePath);
    
    if (stat.isDirectory()) {
      copiedCount += copyDirectory(sourcePath, destPath, memoryTracker);
    } else {
      copyFileSync(sourcePath, destPath);
      log(`  Copied: ${entry}`, colors.cyan);
      copiedCount++;
    }
    
    checkMemory(memoryTracker);
  }
  
  return copiedCount;
}

/**
 * Copies posts to dist directory, excluding example-post.md
 * @param {string} sourceDir - Source directory for posts
 * @param {string} destDir - Destination directory for posts
 * @param {Object} memoryTracker - Object tracking max memory usage
 */
function copyPosts(sourceDir, destDir, memoryTracker) {
  log(`\n${colors.bright}Copying posts${colors.reset}`, colors.magenta);
  
  // Ensure destination directory exists
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
    log(`Created directory: ${destDir}`, colors.cyan);
  }
  
  // Read all files from posts directory
  const files = readdirSync(sourceDir);
  let copiedCount = 0;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Skip example-post.md
    if (file === 'example-post.md') {
      log(`Skipping: ${file}`, colors.yellow);
      continue;
    }
    
    // Copy the file
    const sourcePath = join(sourceDir, file);
    const destPath = join(destDir, file);
    copyFileSync(sourcePath, destPath);
    log(`Copied: ${file}`, colors.cyan);
    copiedCount++;
    
    // Check memory periodically
    checkMemory(memoryTracker);
  }
  
  log(`✓ Copied ${copiedCount} post(s) to ${destDir}`, colors.green);
}

/**
 * Copies public folder to dist directory
 * @param {string} sourceDir - Source public directory
 * @param {string} destDir - Destination public directory
 * @param {Object} memoryTracker - Object tracking max memory usage
 */
function copyPublicFolder(sourceDir, destDir, memoryTracker) {
  log(`\n${colors.bright}Copying public folder${colors.reset}`, colors.magenta);
  
  const copiedCount = copyDirectory(sourceDir, destDir, memoryTracker);
  
  log(`✓ Copied ${copiedCount} file(s) to ${destDir}`, colors.green);
}

/**
 * Main build function
 */
function main() {
  // Initialize memory and time tracking
  const memoryTracker = {
    maxHeapUsedMB: 0,
  };
  const startTime = performance.now();
  
  // Set up memory monitoring interval (check every 500ms)
  const memoryInterval = setInterval(() => {
    checkMemory(memoryTracker);
  }, 500);
  
  const rootDir = getCurrentDir();
  const postsSourceDir = join(rootDir, 'posts');
  const postsDestDir = join(rootDir, 'dist', 'posts');
  const publicSourceDir = join(rootDir, 'public');
  const publicDestDir = join(rootDir, 'dist', 'public');
  
  log(`${colors.bright}${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`, colors.blue);
  log(`${colors.bright}${colors.blue}  Starting Build Process${colors.reset}`, colors.blue);
  log(`${colors.bright}${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`, colors.blue);
  
  // Initial memory check
  checkMemory(memoryTracker);
  
  // Step 1: Build client
  runCommand('yarn vite build', 'Step 1: Building client bundle', colors.blue, memoryTracker);
  
  // Step 2: Build server SSR modules
  runCommand('yarn vite build --config vite.config.server.ts', 'Step 2: Building server SSR modules', colors.cyan, memoryTracker);
  
  // Step 3: Bundle server entry with esbuild
  // Note: --external:./server/* tells esbuild to not bundle the SSR modules (they're loaded dynamically)
  runCommand(
    'yarn esbuild src/server.ts --bundle --platform=node --format=esm --packages=external --external:"./server/*" --external:"./client" --outfile=dist/server.js',
    'Step 3: Bundling server with esbuild',
    colors.yellow,
    memoryTracker
  );
  
  // Step 4: Copy posts (excluding example-post.md)
  copyPosts(postsSourceDir, postsDestDir, memoryTracker);
  
  // Step 5: Copy public folder
  copyPublicFolder(publicSourceDir, publicDestDir, memoryTracker);
  
  // Stop memory monitoring
  clearInterval(memoryInterval);
  
  // Final memory check
  checkMemory(memoryTracker);
  
  // Calculate total time
  const endTime = performance.now();
  const totalTimeMs = endTime - startTime;
  
  // Get final memory stats
  const finalMemUsage = process.memoryUsage();
  
  log(`\n${colors.bright}${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`, colors.green);
  log(`${colors.bright}${colors.green}  Build completed successfully!${colors.reset}`, colors.green);
  log(`${colors.bright}${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`, colors.green);
  
  // Display build statistics
  log(`\n${colors.bright}${colors.cyan}Build Statistics:${colors.reset}`, colors.cyan);
  log(`${colors.bright}Total Time:${colors.reset} ${colors.yellow}${formatTime(totalTimeMs)}${colors.reset}`, colors.reset);
  log(`${colors.bright}Max Heap Used:${colors.reset} ${colors.yellow}${memoryTracker.maxHeapUsedMB.toFixed(2)} MB${colors.reset}`, colors.reset);
  log(`${colors.bright}Final Memory:${colors.reset}`, colors.reset);
  log(`  Heap Used: ${formatBytes(finalMemUsage.heapUsed)}`, colors.cyan);
  log(`  Heap Total: ${formatBytes(finalMemUsage.heapTotal)}`, colors.cyan);
  log(`  RSS: ${formatBytes(finalMemUsage.rss)}`, colors.cyan);
  log(`  External: ${formatBytes(finalMemUsage.external)}`, colors.cyan);
}

// Run the build
main();

