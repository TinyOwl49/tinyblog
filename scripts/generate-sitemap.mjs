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
			const path = page.replace(/index\.html$/, '').replace(/\.html$/, '');

			// Googleがサイトをクロールする際にエラーが出るので除外
			const hidePath = [
				"404"
			]
			if (hidePath.includes(path)) return '';

			const url = new URL(path, SITE_URL);
			// articlesディレクトリ内から同名の.mdファイルを探す
			const articleMdPath = `./${path}.md`;

			let lastmod = new Date().toISOString();
			if (fs.existsSync(articleMdPath)) {
				const file = fs.readFileSync(articleMdPath, 'utf-8');
				// ファイルの最終更新日を取得
				const match = file.match(/date:\s*(.*)/);
				if (match) {
					const date = new Date(match[1]);
					if (!isNaN(date)) {
						lastmod = date.toISOString();
					}
				}
			}

			return `
  <url>
    <loc>${url.href}</loc>
    <lastmod>${lastmod}</lastmod>
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
