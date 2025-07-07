import { marked } from "marked";
import katex from "katex";

export function latex_code(): marked.MarkedExtension {
	const inline: marked.TokenizerAndRendererExtension = {
		name: "latex",
		level: "inline",
		start(src) {
			return src.indexOf('$');
		},
		tokenizer(src, tokens) {
			const rule = /^\$+(.+?)\$+/;
			const match = rule.exec(src);
			if (match) {
				return {
					type: "latex",
					raw: match[0],
					tex: match[1],
					html: "", // will be replaced in walkTokens
				};
			}
		},
		renderer(token) {
			return token.html;
		},

	};

	const block: marked.TokenizerAndRendererExtension = {
		name: "latex",
		level: "block",
		start(src) {
			return src.indexOf('\n$$');
		},
		tokenizer(src, tokens) {
			const rule = /^\$\$(.+?)\$\$/s;
			const match = rule.exec(src);
			if (match) {
				return {
					type: "latex",
					raw: match[0],
					tex: match[1],
					html: "", // will be replaced in walkTokens
				};
			}
		},
		renderer(token) {
			return token.html;
		},

	};


	const walkTokens = (token: any) => {
		if (token.type === "latex") {
			console.log("Processing LaTeX token:", token.tex);
			const res = katex.renderToString(token.tex, { output: "mathml", throwOnError: false, displayMode: token.type === "latex" && token.raw.startsWith("$$") });
			token.html = res;
		}
	}

	return {
		extensions: [inline, block],
		walkTokens(token) {
			walkTokens(token);
		},
	}
}
