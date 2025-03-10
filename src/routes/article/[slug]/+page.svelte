<script lang="ts">
	import MarkdownView from "$lib/MarkdownView.svelte";
	import Toc from "$lib/Toc.svelte";
	import { dateToString } from "$lib/utils";
	import type { PageProps } from "./$types";
	import { base } from "$app/paths";

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<meta property="og:title" content={`Tiny Forest - ${data.title}`} />
	<meta property="og:type" content="article" />
	<!-- <meta property="og:url" content=${} /> -->
	<meta property="og:site_name" content="Tiny Forest" />
	<meta property="og:description" content={data.description} />
	<!--<meta property="og:image" content="{base}/static/favicon.png" />-->
</svelte:head>

<div>
	<h1>{data.title}</h1>
	<p>作成日: {dateToString(data.date)}</p>
</div>

<div class="article-content">
	<div id="article-container">
		<MarkdownView content={data.content} />
	</div>

	<!-- TODO: 目次の実装 -->
	<!--	<Toc targetSelector="#article-container" /> -->
</div>

<style>
	.article-content {
		padding: 10px 20px;
		border-radius: 10px;
		background-color: #202020;
		border: 0.5px solid #375c79;
	}

	:global(a) {
		color: skyblue;
	}
</style>
