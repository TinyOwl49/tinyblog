import fs from 'fs';
import { glob } from 'glob';

const SITE_URL = 'https://tinyowl49.github.io/tinyblog';
const BUILD_DIR = './build';

async function generateSitemap() {
	console.log('Generating sitemap...');

	// buildディレクトリ内の全HTMLファイルを取得
	const pages = await glob('**/*.html', { cwd: BUILD_DIR });

	const urlset = pages
		.map((page) => {
			// 'index.html'をルート'/'に変換
			const path = page.replace(/index\.html$/, '').replace(/\.html$/, '');
			return `
  <url>
    <loc>${SITE_URL}/${path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`;
		})
		.join('');

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlset}
</urlset>`;

	fs.writeFileSync(`${BUILD_DIR}/sitemap.xml`, sitemap);

	console.log('Sitemap generated successfully!');
}

generateSitemap();
