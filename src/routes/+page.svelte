<script lang="ts">
	import { base } from "$app/paths";
	import ArticleList from "$lib/ArticleList.svelte";
	import { articles } from "$lib/stores";

	// 日付順（降順）でソートしたarticlesを作成
	$: sortedArticles = [...$articles].sort((a, b) => {
		const dateA = a.date ? new Date(a.date).getTime() : 0;
		const dateB = b.date ? new Date(b.date).getTime() : 0;
		return dateB - dateA;
	});
</script>

<svelte:head>
	<title>Tiny Blog</title>
	<meta property="og:title" content={`Tiny Forest`} />
	<meta property="og:type" content="article" />
	<!-- <meta property="og:url" content=${} /> -->
	<meta property="og:site_name" content="Tiny Forest" />
	<meta
		property="og:description"
		content="ちょっとしたことを書いていく個人ブログです。"
	/>
	<meta
		property="og:image"
		content="https://raw.githubusercontent.com/TinyOwl49/tinyblog/refs/heads/main/static/favicon.png"
	/>
</svelte:head>

<div class="article-list-container">
	<h1 class="align-center">記事一覧</h1>
	<ArticleList articles={sortedArticles} />
</div>

<style>
	.align-center {
		text-align: center;
	}
	.article-list-container {
		display: flex;
		flex-flow: column;
		gap: 20px;
		padding: 20px 0;
	}

	@media (min-width: 768px) {
		.article-list-container {
			width: 80%;
			margin: auto;
		}
	}

	@media (max-width: 767px) {
		.article-list-container {
			width: 100%;
		}
	}
</style>
