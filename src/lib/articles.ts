export type ArticleData = {
	title: string,
	slug: string,
	date?: Date,
	author?: string,
	content: string,
	description: string,
	thumbnail?: string,
}

function getFrontMatter(content: string) {
	// 空文字を除く+行ごとに分割
	const contentLine = content.split('\n');
	const result = {};

	contentLine.map(v => {
		// ""で囲まれた部分以外の空文字を削除
		const text = v.replace(/("[^"]*")|\s+/g, (match, quoted) => quoted ? quoted : "");
		const r = text.split(/:(.+)/);
		if (r.length >= 2) {
			const n = r[0].replace(/\s/g, "");
			const d = r[1]; // name: "flat is justice" -> n: name, d: "flat is justice"
			result[n] = d.replace(/\"/g, "");
		}
	})

	return result;
}

export function loadArticleData(text: string): ArticleData | undefined {
	// 正規表現でタイトルと内容を抽出
	const match = text.match(/---([\s\S]*?)---/);

	if (match) {
		const frontMatter = getFrontMatter(match[1]);
		const remainingText = text.replace(match[0], "").trim();

		return {
			content: remainingText,
			title: frontMatter["title"],
			slug: frontMatter["slug"],
			date: new Date(frontMatter["date"]),
			description: frontMatter['description'],
			thumbnail: frontMatter['thumbnail'],
		};
	}

	return undefined;
}

export function getAllArticles() {
	const articles: ArticleData[] = [];
	const files = import.meta.glob(`../../articles/*.md`, { eager: true, query: '?raw' })
	Object.values(files).forEach(v => {
		const data = v['default'];
		const article = loadArticleData(data);
		if (article) {
			articles.push(article);
		}
	})

	return articles;
}
