import { marked } from "marked";
import hljs from 'highlight.js';
// import DOMPurify from 'dompurify';
import { question_block } from "./question";
import { latex_code } from "./latex";

type RendererArgument = {
	text: string,
	lang: string
}

export function set_options() {
	marked.setOptions({
		pedantic: false, // trueの場合はmarkdown.plに準拠する gfmを使用する場合はfalseで大丈夫
		async: true, // 非同期でparse
		silent: true, // trueにするとパースに失敗してもExceptionを投げなくなる
		gfm: true, // GitHub Flavored Markdownを使用
	});

	marked.use(code_with_filename(), latex_code(), question_block(), header_with_id());
}

function code_with_filename(): marked.MarkedExtension {
	const renderer = (arg: RendererArgument) => {
		const code = arg.text;
		const lang = arg.lang;
		if (!lang) return `<pre><code>${code}</code></pre>`;
		const spt = lang.split(':');

		const l = spt[0];
		let filename = spt.length > 1 ? spt[1].replace(' ', '') : null;

		const language = hljs.getLanguage(l) ? l : 'plaintext';
		const html = hljs.highlight(code, { language }).value;
		const fileTag = `
			<code class="filename">${filename}</code>
		`;

		return `
		<pre>
			${filename ? fileTag : ""}
			<code class="hljs language-${language}">${html}</code>
		</pre>
		`
	}

	return {
		renderer: {
			code(code: any, lang: any, _: any) { return renderer(code, lang) },
		}
	}
}


function header_with_id(): marked.MarkedExtension {
	let headerIndex = 0;
	return {
		renderer: {
			heading(token: marked.Tokens.Heading) {
				const text = this.parser.parseInline(token.tokens);
				const level = token.depth;
				const id = `heading-${headerIndex++}`;
				console.log(`<h${level} id="${id}">${text}</h${level}>\n`)
				return `<h${level} id="${id}">${text}</h${level}>\n`;
			}
		}
	};
}

export function toHTML(content: string) {
	let html = marked.parse(content);
	// let clean = DOMPurify.sanitize(html);
	return html;
}
