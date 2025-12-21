#!/usr/bin/env node

/**
 * Build script for static portfolio website
 * Validates files and ensures all required assets are present
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, required = true) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    const stats = fs.statSync(filePath);
    log(`✓ ${filePath} (${(stats.size / 1024).toFixed(2)} KB)`, 'green');
    return true;
  } else {
    if (required) {
      log(`✗ ${filePath} - MISSING (required)`, 'red');
      return false;
    } else {
      log(`⚠ ${filePath} - Missing (optional)`, 'yellow');
      return true; // Optional files don't fail the build
    }
  }
}

function validateBuild() {
  log('\n🔍 Validating build...\n', 'blue');
  
  let hasErrors = false;
  
  // Required files
  log('📄 Required Files:', 'blue');
  const requiredFiles = [
    'index.html',
    'js/main.js',
    'js/content-manager.js',
    'css/style.css',
    'data/content.json',
    'favicon.svg',
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'site.webmanifest',
    'robots.txt',
    'sitemap.xml'
  ];
  
  requiredFiles.forEach(file => {
    if (!checkFile(file, true)) {
      hasErrors = true;
    }
  });
  
  // Optional files
  log('\n📦 Optional Files:', 'blue');
  const optionalFiles = [
    'img/screenshot-desktop.png',
    'img/screenshot-mobile.png',
    '.htaccess'
  ];
  
  optionalFiles.forEach(file => {
    checkFile(file, false);
  });
  
  // Check library files
  log('\n📚 Library Files:', 'blue');
  const libraryFiles = [
    'lib/jquery/jquery.min.js',
    'lib/bootstrap/js/bootstrap.min.js',
    'lib/typed/typed.min.js',
    'lib/font-awesome/css/font-awesome.min.css',
    'lib/ionicons/css/ionicons.min.css'
  ];
  
  libraryFiles.forEach(file => {
    if (!checkFile(file, true)) {
      hasErrors = true;
    }
  });
  
  // Summary
  log('\n' + '='.repeat(50), 'blue');
  if (hasErrors) {
    log('❌ Build validation failed!', 'red');
    log('Please fix the missing required files before deploying.', 'yellow');
    process.exit(1);
  } else {
    log('✅ Build validation passed!', 'green');
    log('All required files are present and ready for deployment.', 'green');
  }
  log('='.repeat(50) + '\n', 'blue');
}

// Main execution
const args = process.argv.slice(2);
const isValidateOnly = args.includes('--validate');

if (isValidateOnly) {
  validateBuild();
} else {
  log('\n🚀 Building portfolio website...\n', 'blue');
  
  // For a static site, "build" is mainly validation
  // In the future, you could add:
  // - CSS minification
  // - JS minification
  // - Image optimization
  // - HTML minification
  
  validateBuild();
  
  log('✨ Build complete!', 'green');
  log('📦 Your static site is ready to deploy.\n', 'green');
}

