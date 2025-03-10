<script lang="ts">
	import ArticleList from "$lib/ArticleList.svelte";

	import { articles } from "$lib/stores";
</script>

<ArticleList articles={$articles} />
