<script lang="ts">
	import MarkdownView from "$lib/MarkdownView.svelte";
	import { loadArticleData } from "$lib/articles";

	let value = $state("");
	let articleData = $derived(loadArticleData(value));
</script>

<div class="editor-container">
	<textarea bind:value></textarea>
	<div>
		<h1>{articleData?.title}</h1>
		<MarkdownView content={articleData?.content} />
	</div>
</div>

<style>
	.editor-container {
		display: flex;
		flex-flow: row;
		gap: 20px;
	}

	textarea {
		background-color: #333;
		border-color: #666;
		color: #ddd;
	}
</style>
