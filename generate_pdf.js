const { chromium } = require('/Users/aldoyh/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');

(async () => {
  const executablePath = `${process.env.HOME}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage();

  await page.goto('http://localhost:9876/PROPOSAL_ar.html', {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: 'Arabic_Proposal.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log('PDF generated: Arabic_Proposal.pdf');
})();
