import { marked } from "marked";

export function question_block(): marked.MarkedExtension {
	const extension: marked.TokenizerAndRendererExtension = {
		name: "question",
		level: "block",
		start(src) {
			return src.indexOf('\n?');
		},
		tokenizer(src, tokens) {
			const rule = /^\?(.+?)\n(.+?)\?/gs;
			const match = rule.exec(src);
			if (match) {
				const token = {
					type: "question",
					raw: match[0],
					title: match[1],
					text: match[2],
					tokens: []
				};

				this.lexer.inline(token.text, token.tokens);    // Queue this data to be processed for inline tokens
				return token;
			}
		},
		renderer(token: any) {
			const res = `
			<div class="question">
				<strong class="title">${token.title}</strong>
				<p class="content">${this.parser.parseInline(token.tokens)}</p>
			</div>
			`

			token.html = res;
			return token.html;
		},

	};

	return {
		extensions: [extension],
	}
}
