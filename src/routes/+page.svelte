<script lang="ts">
    import { base } from "$app/paths";
	import ArticleList from "$lib/ArticleList.svelte";
	import { articles } from "$lib/stores";
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
	<ArticleList articles={$articles} />
</div>

<style>
	.align-center {
		text-align: center;
	}
	.article-list-container {
		display: flex;
		flex-flow: column;
		gap: 20px;
		padding: 20px;
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
