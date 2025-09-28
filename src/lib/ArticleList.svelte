<script lang="ts">
	import { base } from "$app/paths";
	import { type ArticleData } from "$lib/articles";
	import { dateToString } from "$lib/utils";

	export let articles: ArticleData[];
</script>

<div class="article-wrap">
	{#each articles as art}
		<a
			class="article-wrap-link"
			href={`${base}/articles/${art.slug}`}
		>
			<nav class="article-card">
				{#if art.thumbnail}
					<img
						class="thumbnail"
						src={base + art.thumbnail}
						alt={art.thumbnail}
					/>
				{/if}
				<div>
					<h2 class="article-title">
						{art.title}
					</h2>
					<p class="article-date">
						{dateToString(art.date)}
					</p>
					<p class="article-description">
						{art.description}
					</p>
				</div>
			</nav>
		</a>
	{/each}
</div>

<style>
	.article-wrap {
		display: flex;
		flex-flow: column;
		gap: 15px 0px;
		overflow-wrap: anywhere;
	}

	a.article-wrap-link {
		color: #eee;
		text-decoration: none;
	}

	.article-card {
		display: flex;
		flex-flow: row;
		background-color: #183251;
		padding: 10px 20px;
		border-radius: 5px;
	}

	.thumbnail {
		width: 100px;
		height: 100px;
		margin: auto 30px auto 0;
		border-radius: 10%;
		float: left;
	}

	.article-title {
		margin-bottom: 2px;
	}
	.article-date {
		font-size: 0.9rem;
		color: #bbb;
		margin: 0;
	}

	.article-description {
		margin-top: 10px;
	}

	@media (max-width: 600px) {
		.article-title {
			font-size: 1rem;
		}
	}

	@media (min-width: 600px) {
		.article-title {
			font-size: 1.2rem;
		}
	}
</style>
