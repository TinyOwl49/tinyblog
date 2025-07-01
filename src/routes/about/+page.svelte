<script lang="ts">
	import { base } from "$app/paths";
</script>

<div class="about-me-page">
	<p>こんにちは！Tiny Blogへようこそ。</p>
	<p>
		このブログは、私が学んだことや作ったものを記録するための場所です。<br
		/>
		他ブログにあげるまでもないことを残しておくための場所になる予定です。
	</p>
	<br />
	<div class="about-me">
		<div>
			<img
				src="/myicon.jpeg"
				class="about-me-icon"
				alt="Tiny Forest Logo"
				width="200"
				height="200"
			/>
			<div class="links">
				<a href="https://github.com/TinyOwl49">
					<img
						class="color-invert"
						src="/github.svg"
						alt="GitHub"
						width="30"
						height="30"
					/>
				</a>
				<a href="https://zenn.dev/tinyowl">
					<img
						src="/zenn.svg"
						alt="GitHub"
						width="30"
						height="30"
					/>
				</a>
				<a href="https://x.com/kasumi_fukurou">
					<img
						class="color-invert"
						src="/twitter-x.svg"
						alt="GitHub"
						width="30"
						height="30"
					/>
				</a>
			</div>
		</div>

		<div class="about-me-content">
			<h3>自己紹介</h3>
			<p>
				東北大学工学部1年の猫梟犬（ねこふくろういぬ）と申します。
			</p>
			<p>
				数学や物理学、情報科学に興味があります。
				最近では特に機械学習や力学系理論、量子力学に興味を持っています。<br
				/>
				趣味はプログラミングと読書、好きな天体はM42とM104、好きな花はスミレです。
			</p>
		</div>
	</div>
</div>

<svelte:head>
	<title>About me</title>
</svelte:head>

<style>
	.about-me-page {
		margin: 0 auto;
		width: 70%;
		font-size: 1.2rem;
	}

	.about-me {
		display: flex;
		max-width: 800px;
		border: 1px solid #375c79;
		padding: 20px;
	}

	.about-me-icon {
		border-radius: 50%;
		margin-right: 30px;
	}

	.color-invert {
		filter: invert(100%);
	}

	.links {
		display: flex;
		gap: 10px;
		margin-top: 20px;
		position: relative;
		left: 36px;
	}


	@media screen and (max-width: 800px) {
		.about-me-page {
			width: 95%;
		}
		.about-me {
			flex-direction: column;
			align-items: center;
		}

		.about-me-icon {
			margin-right: 0;
			margin-bottom: 20px;
		}

		.links {
			position: static;
			left: 0;
		}
	}
	@media screen and (mix-width: 800px) {
	}
</style>
