<script lang="ts">
	import { base } from "$app/paths";
</script>

<div class="container">
	<header>
		<h1 class="homepage-title">
			<a href="{base}/"> Tiny Blog </a>
		</h1>

		<div class="header-link">
			<a href="{base}/">Home</a>
			<a href="{base}/about">About</a>
		</div>
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	:global(html) {
		background-color: #081d35;
	}

	.homepage-title {
		text-shadow:
			0 0 5px lightskyblue,
			0 0 10px lightskyblue;
		margin: 15px 10px;
	}

	.homepage-title > a {
		font-size: 2.4rem;
		font-weight: 100;
		text-decoration: none;
		color: #eee;
	}

	.header-link > a {
		text-decoration: none;
		color: dodgerblue;
			font-size: 1.4rem;
	}

	@media (min-width: 768px) {
		.header-link {
			position: absolute;
			top: 30px;
			right: 80px;
			float: right;
		}

		.header-link > a {
			margin: 10px;
		}
	}

	@media (max-width: 768px) {
		.header-link {
			position: absolute;
			top: 38px;
			right: 20px;
			float: right;
		}
		.header-link > a {
			margin: 5px;
		}
	}

	main {
		margin: 30px 0;
	}

	main {
		color: #eee;
		font-size: 1.1rem;
		line-height: 1.6rem;
		font-family: "Noto Sans JP", sans-serif;
		font-optical-sizing: auto;
		font-weight: 330;
		font-style: normal;
	}
</style>
