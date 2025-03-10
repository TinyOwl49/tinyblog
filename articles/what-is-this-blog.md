---
title: "このブログの説明"
slug: "what-is-this-blog"
date: "2025-3-5"
author: tinyowl
description: "このブログの誕生秘話(?)です。"
thumbnail: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgv6HbVj84Ii-iHFz3DWjFdZ6VSDFiopTyx6HcjKKbg62xoJCWjO1g_3EIHl7MLzExMe0si90liMXu0jbSJiUJOJdLGYO7R-bqqKeXFO7ofD4RFpFbtnq29Tvj0aFWis-pMaw662DX36WF4m_c9lLYF-u76DBMHqMN3MYLRyp4AEHaO3JPu59CWVu4V62Nr/s400/kodai_magdeburg_unicorn_kaseki.png"
tag: "programming, math, poem"
---
## 自己紹介
**ねこふくろういぬ**と申します。
情報理論や数学、物理、天文に興味がある大学1年生です。  
プログラミングが趣味で、PythonやC#、Typescriptあたりがちょっとだけできます。
### このブログを作った理由
自分の興味のあることを好き勝手に喋ったり、調べたことを残しておくために作りました。他ブログ(NoteとかZennとか)にあげるまでもないことを記事にしていく予定です。
## 使った技術
以下を使用しました。
- Typescript
- Svelte / Sveltekit
- Marked.js
- Highlight.js, Katex等
- Github Pages

作成にあたっては、ChatGPT先生にもお力添えをいただきました。
### Svelte
フロントエンドのフレームワークにはSvelteを使用しました。私はSvelte推しです。
Reactも少しだけ触れるのですが、SvelteはReactに比べると記法がシンプルでわかりやすく、学習コストが低いです。  
例えばこの記事ページのソースコードはこんな感じ。
```html
<script lang="ts">
	import MarkdownView from "$lib/MarkdownView.svelte";
	import { dateToString } from "$lib/utils";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<meta property="og:title" content={`Tiny Forest - ${data.title}`} />
	...
</svelte:head>

<div>
	<h1>{data.title}</h1>
	<p>作成日: {dateToString(data.date)}</p>
</div>

<div class="article-content">
	<div id="article-container">
		<MarkdownView content={data.content} />
	</div>

	...
</div>

<style>
	.article-content {
		padding: 10px 20px;
		border-radius: 10px;
		background-color: #202020;
		border: 0.5px solid #375c79;
	}

	...
</style>
```
とてもシンプル。みんなも使おう、Svelte。