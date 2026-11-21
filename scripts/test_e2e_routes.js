const http = require('http');

const routes = [
  '/',
  '/about',
  '/contact',
  '/journal',
  '/partners',
  '/products',
  '/recipes',
  '/store',
  // All 15 products
  '/products/chocolate',
  '/products/caramel',
  '/products/salted-caramel',
  '/products/condensed-milk',
  '/products/blueberry',
  '/products/raspberry',
  '/products/mixberry',
  '/products/strawberry',
  '/products/passion-fruit',
  '/products/mango',
  '/products/peach',
  '/products/kiwi',
  '/products/watermelon',
  '/products/pineapple',
  '/products/green-apple',
  // Nonexistent product (should be 404)
  '/products/invalid-slug-check',
  // English routes (rewrites)
  '/en',
  '/en/products',
  '/en/products/caramel',
  '/en/about',
  '/en/contact',
  '/en/recipes',
  '/en/store',
];

function fetchRoute(port, route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:${port}${route}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          route,
          statusCode: res.statusCode,
          hasWhatsApp: data.includes('201050677740'),
          hasLogo: data.includes('akula-topping-logo-new.jpg'),
          contentLength: data.length,
        });
      });
    }).on('error', (err) => {
      resolve({ route, error: err.message });
    });
  });
}

async function runTests(port) {
  console.log(`Starting E2E route testing against port ${port}...\n`);
  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    const res = await fetchRoute(port, r);
    if (res.error) {
      console.log(`✗ ${r}: FAILED to connect (${res.error})`);
      failed++;
    } else if (r === '/products/invalid-slug-check') {
      if (res.statusCode === 404) {
        console.log(`✓ ${r}: Returned 404 as expected (Graceful fallback)`);
        passed++;
      } else {
        console.log(`✗ ${r}: Expected 404 but got ${res.statusCode}`);
        failed++;
      }
    } else if (res.statusCode === 200) {
      console.log(`✓ ${r}: 200 OK (${res.contentLength} bytes, WhatsApp: ${res.hasWhatsApp ? '✓' : '✗'}, Logo: ${res.hasLogo ? '✓' : '✗'})`);
      passed++;
    } else {
      console.log(`✗ ${r}: Returned status ${res.statusCode}`);
      failed++;
    }
  }

  console.log(`\n=== ROUTE TEST SUMMARY ===`);
  console.log(`Total tested: ${routes.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
}

const port = process.argv[2] ? parseInt(process.argv[2], 10) : 3000;
runTests(port);
