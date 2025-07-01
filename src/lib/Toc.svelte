<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	type ItemData = {
		id: string;
		text: string | null;
		level: number;
	};

	const toc = writable<ItemData[]>([]);
	export let content: string = "";

	function extractHeaders(markdown: string): ItemData[] {
		markdown = markdown.replace(/```[\s\S]*?```/g, '');
		const regex = /^(\#{1,6})\s+(.*)$/gm;
		const headers: ItemData[] = [];
		let match;
		let index = 0;
		while ((match = regex.exec(markdown)) !== null) {
			const id = `heading-${index}`;
			headers.push({
				id: id,
				level: match[1].length,
				text: match[2].trim(),
			});
			index++;
		}
		return headers;
	}

	onMount(() => {
		const headers = extractHeaders(content);
		toc.set(headers);
	});
</script>

<div class="toc">
	<h3>目次</h3>
	<ul>
		{#each $toc as item}
			<li class={`h${item.level}`}>
				<a href={`#${item.id}`}>{item.text}</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.toc ul {
		list-style: none;
		padding: 0;
	}

	.toc li {
		margin: 5px 0;
	}

	.toc a {
		text-decoration: none;
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
