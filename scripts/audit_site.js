const fs = require('fs');
const path = require('path');

console.log('=== RUNNING AUTOMATED SITE AUDIT ===\n');

// 1. Check all image references in src
const publicDir = path.resolve('public');
const assetsDir = path.resolve('public/assets');

let allTsxFiles = [];
function findFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        findFiles(full);
      }
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      allTsxFiles.push(full);
    }
  }
}
findFiles('src');

console.log(`Found ${allTsxFiles.length} source files in src/`);

let missingImages = [];
let deadLinks = [];
let whatsappAudit = [];

for (const file of allTsxFiles) {
  const content = fs.readFileSync(file, 'utf8');

  // Check images
  const imgSrcRegex = /src=[\"'](\/[^\"']+)[\"']/g;
  let match;
  while ((match = imgSrcRegex.exec(content)) !== null) {
    const srcPath = match[1].split('?')[0];
    const fullLocal = path.join(publicDir, srcPath.startsWith('/') ? srcPath.slice(1) : srcPath);
    if (!fs.existsSync(fullLocal)) {
      missingImages.push({ file: path.relative('.', file), src: srcPath });
    }
  }

  // Check hrefs
  const hrefRegex = /href=[\"']([^\"']+)[\"']/g;
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    if (href === '#' || href === '') {
      deadLinks.push({ file: path.relative('.', file), href });
    }
    if (href.includes('wa.me') || href.includes('whatsapp.com')) {
      const uses20 = href.includes('201050677740') || href.includes('201041412923');
      whatsappAudit.push({ file: path.relative('.', file), href, uses20 });
    }
  }
}

console.log('\n--- IMAGE AUDIT ---');
if (missingImages.length === 0) {
  console.log('✓ All referenced image paths exist in public/');
} else {
  console.log(`✗ Found ${missingImages.length} missing images:`, missingImages);
}

console.log('\n--- DEAD LINKS AUDIT ---');
if (deadLinks.length === 0) {
  console.log('✓ No dead href="#" or empty hrefs found!');
} else {
  console.log(`✗ Found ${deadLinks.length} dead links:`, deadLinks);
}

console.log('\n--- WHATSAPP INTEGRATION AUDIT ---');
let waErrors = whatsappAudit.filter(w => !w.uses20);
if (waErrors.length === 0) {
  console.log(`✓ All ${whatsappAudit.length} WhatsApp links use verified international Egypt numbers (20...)`);
} else {
  console.log(`✗ Found ${waErrors.length} invalid WhatsApp links:`, waErrors);
}

// 2. Check all products in referenceData.ts
const refData = require(path.resolve('src/utils/referenceData.ts'));
console.log('\n--- PRODUCT CATALOGUE AUDIT ---');
console.log(`Total products in referenceData: ${refData.productsData ? refData.productsData.length : 0}`);
let missingProfiles = [];
let missingBottleImages = [];

if (refData.productsData) {
  for (const p of refData.productsData) {
    if (!refData.flavourProfilesData[p.slug]) {
      missingProfiles.push(p.slug);
    }
    const imgPath = path.join(assetsDir, `${p.slug}.jpg`);
    if (!fs.existsSync(imgPath)) {
      missingBottleImages.push(`${p.slug}.jpg`);
    }
  }
}

if (missingProfiles.length === 0) {
  console.log('✓ Every product has a complete flavour profile in flavourProfilesData');
} else {
  console.log('✗ Missing flavour profiles for:', missingProfiles);
}

if (missingBottleImages.length === 0) {
  console.log('✓ Every product bottle packaging image exists in public/assets/');
} else {
  console.log('✗ Missing product packaging images for:', missingBottleImages);
}
