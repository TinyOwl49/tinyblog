<script lang="ts">
	import ArticleList from "$lib/ArticleList.svelte";

	import { articles } from "$lib/stores";
</script>

<svelte:head>
	<meta property="og:title" content={`Tiny Forest`} />
	<meta property="og:type" content="article" />
	<!-- <meta property="og:url" content=${} /> -->
	<meta property="og:site_name" content="Tiny Forest" />
	<meta
		property="og:description"
		content="ちょっとしたことを書いていく個人ブログです。"
	/>
	<!-- WARNING: あまりにひどい方法なのでいつか直す -->
	<meta property="og:image" content="https://raw.githubusercontent.com/TinyOwl49/tinyblog/refs/heads/main/static/favicon.png" />
</svelte:head>
<ArticleList articles={$articles} />
