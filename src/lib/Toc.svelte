<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	type ItemData = {
		id: string;
		text: string | null;
		level: string;
	};

	const toc = writable<ItemData[]>([]);
	export let targetSelector;

	function buildToc(article: HTMLElement) {
		const headings = Array.from(
			article.querySelectorAll("h1, h2, h3, h4"),
		);
		const tocItems: ItemData[] = headings.map((heading, index) => {
			const id = `heading-${index}`;
			heading.id = id; // 見出しに ID を付与
			console.log(heading);
			return {
				id: id,
				text: heading.textContent,
				level: heading.tagName.toLowerCase(),
			};
		});

		toc.set(tocItems);
	}

	onMount(() => {
		const article: HTMLElement =
			document.querySelector(targetSelector);
		if (!article) return;
		buildToc(article);
	});
</script>

<div class="toc">
	<h3>目次</h3>
	<ul>
		{#each $toc as item}
			<li class={item.level}>
				<a href={`#${item.id}`}>{item.text}</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.toc {
		position: fixed;
		top: 20px;
		left: 20px;
		background: #f8f9fa;
		padding: 10px;
		border-radius: 8px;
		width: 200px;
	}

	.toc ul {
		list-style: none;
		padding: 0;
	}

	.toc li {
		margin: 5px 0;
	}

	.toc a {
		text-decoration: none;
		color: #007bff;
		cursor: pointer;
	}

	.toc a:hover {
		text-decoration: underline;
	}

	.toc .h1 {
		font-size: 1.2em;
		font-weight: bold;
	}
	.toc .h2 {
		font-size: 1.1em;
		margin-left: 10px;
	}
	.toc .h3 {
		font-size: 1em;
		margin-left: 20px;
	}
	.toc .h4 {
		font-size: 0.9em;
		margin-left: 30px;
	}
</style>
