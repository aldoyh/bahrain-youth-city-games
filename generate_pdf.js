const { chromium } = require('/Users/aldoyh/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const files = [
    { html: 'PROPOSAL.html', pdf: 'Proposal.pdf' },
    { html: 'PROPOSAL_ar.html', pdf: 'Arabic_Proposal.pdf' },
    { html: 'PROPOSAL_light.html', pdf: 'Proposal_Light.pdf' },
    { html: 'PROPOSAL_ar_light.html', pdf: 'Arabic_Proposal_Light.pdf' }
  ];

  for (const file of files) {
    const fileUrl = `file://${path.resolve(__dirname, file.html)}`;
    console.log(`Navigating to ${fileUrl}...`);
    await page.goto(fileUrl, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    await page.evaluate(() => document.fonts.ready);

    console.log(`Generating ${file.pdf}...`);
    await page.pdf({
      path: file.pdf,
      format: 'A4',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    console.log(`PDF generated: ${file.pdf}`);
  }

  await browser.close();
  console.log('All PDFs generated successfully.');
})();
