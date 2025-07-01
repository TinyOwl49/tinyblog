<script lang="ts">
	import MarkdownView from "$lib/MarkdownView.svelte";
	import Toc from "$lib/Toc.svelte";
	import { dateToString } from "$lib/utils";
	import type { PageProps } from "./$types";
	import { base } from "$app/paths";

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta property="og:title" content={`Tiny Forest - ${data.title}`} />
	<meta property="og:type" content="article" />
	<!-- <meta property="og:url" content=${} /> -->
	<meta property="og:site_name" content="Tiny Forest" />
	<meta property="og:description" content={data.description} />
	<!-- WARNING: あまりにひどい方法なのでいつか直す -->
	<meta
		property="og:image"
		content="https://raw.githubusercontent.com/TinyOwl49/tinyblog/refs/heads/main/static/favicon.png"
	/>
</svelte:head>

<div>
	<h1 class="article-title">{data.title}</h1>
	<p class="article-date">作成日: {dateToString(data.date)}</p>
</div>

<div class="article-body">
	<div class="article-content">
		<MarkdownView content={data.content} />
	</div>
	<div class="toc-container">
		<Toc content={data.content} />
	</div>
</div>

<style>
	.article-title {
		font-size: 2.4rem;
		font-weight: 100;
		line-height: 1.3;
		margin: 10px 0;
		color: #eee;
		text-align: center;
	}

	.article-date {
		position: relative;
		right: 50px;
		float: right;
		margin-bottom: 20px;
		font-size: 1.2rem;
		color: #aaa;
	}

	.article-body {
		position: relative;
		top: 20px;
		display: flex;
		align-items: flex-start;
		gap: 20px;
	}

	.article-content {
		padding: 10px 20px;
		border-radius: 10px;
		background-color: #202020;
		border: 0.5px solid #375c79;
	}

	:global(a) {
		color: skyblue;
	}

	@media screen and (min-width: 600px) {
		.article-body {
			width: 84%;
			margin: 0 8%;
			flex-direction: row;
		}
		.toc-container {
			position: sticky;
			top: 0;
			right: 0;
			width: 300px;
		}
	}

	@media screen and (max-width: 600px) {
		.article-body {
			width: 100%;
			flex-direction: column-reverse;
		}
		.toc-container {
			position: relative;
			margin: 0 auto;
		}
	}
</style>
