<script lang="ts">
	import { base } from "$app/paths";
	import * as markdown from "./markdown/markdown";
	markdown.set_options();

	export let content: string = "";
	// TODO: ちょいヤバコード！もしかしたらなおす
	content = content.replace("${base}", base);
</script>

<div>
	{#await markdown.toHTML(content) then val}
		<span>{@html val}</span>
	{/await}
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
	@import url("https://unpkg.com/@highlightjs/cdn-assets@11.7.0/styles/atom-one-dark.min.css");

	:global(pre) {
		/* NOTE:  When I set `diplay: flex (or inline)`, the gap between codes will appear.
                          I don't know why `display: grid` can solve this problem. */
		display: grid;
		margin: 0px 10px;
		overflow-x: scroll;
		background-color: var(--code-background-color, "#202020");
	}

	:global(pre > code) {
		font-size: var(--code-font-size, 15px);
		font-family: "Roboto Mono", monospace;
	}

	:global(pre > code.filename) {
		float: right;
		padding: 2px 10px;
		color: #bbb;
		background: #323e52;
	}

	:global(blockquote:not([class])) {
		position: relative;
		margin-top: 15px;
		padding: 35px 15px 10px 15px;

		border-left: 4px solid #9dd4ff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
		box-sizing: border-box;

		font-style: italic;
		background: #333;
		color: #bbb;
	}

	:global(blockquote:not([class]):before) {
		display: inline-block;
		position: absolute;
		top: 5px;
		left: 3px;
		content: "“";
		font-family: sans-serif;
		color: #9dd4ff;
		font-size: 90px;
		line-height: 1;
	}

	:global(blockquote:not([class]) p) {
		padding: 0;
		margin: 7px 0;
		line-height: 1.7;
	}

	:global(blockquote:not([class]) cite) {
		display: block;
		text-align: right;
		color: #888888;
		font-size: 0.9em;
	}

	:global(p > img) {
		width: 100%;
	}

	:global(div.question) {
		background-color: rgba(77, 186, 196, 0.05);
		border: 1px solid #4dbac4;
		border-radius: 5px;

		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
		padding: 15px;
	}

	/* :global(div.question > p.title) {
	} */

	:global(th, td) {
		padding: 2px 7px;
		border: #999 solid 1px;
	}

	:global(thead) {
		background-color: #ddd;
	}
</style>
