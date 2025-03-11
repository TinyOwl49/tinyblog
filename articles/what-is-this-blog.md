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
情報理論や数学、物理、天文が好きな大学1年生です。   
特に機械学習、量子力学、代数学に興味があります。   
プログラミングが趣味で、PythonやC#、Typescriptあたりがちょっとだけできます。
### このブログを作った理由
自分の興味のあることを好き勝手に喋ったり、調べたことを残しておくために作りました。他ブログ(NoteとかZennとか)にあげるまでもないことを記事にしていく予定です。
## 使った技術について話す
以下を使用しました。
- Typescript
- Svelte / Sveltekit
- Marked.js
- Highlight.js, Katex等
- Github Pages  

ソースコードは[こちら](https://github.com/TinyOwl49/tinyblog)で見れます。
### Svelte
フロントエンドのフレームワークには[Svelte](https://svelte.jp/)を使用しました。私はSvelte推しです。
SvelteはReactなどの他フレームワークに比べて記法がシンプルでわかりやすく、学習コストが低いのが特徴です。  
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
とてもシンプルですてき。みんなも使おう、Svelte。

### Github Pagesにデプロイ
Sveltekitでは静的サイトを簡単に生成できるので、Github Pagesと組み合わせることで楽にブログを作ることができます。  
参考: [公式Doc](https://svelte.jp/docs/kit/adapter-static)
  
ですが私はここで詰まって苦労したので、少しメモを残しておきたいと思います。  
基本的には公式Docに従えば良いです。ただ、このサイトのworkflowをそのままコピペして使うとymlのインデントが正しくないと怒られたので、手動で直しました。   
また、package-lock.jsonがあるとインストールするライブラリが環境によって違うことが原因でエラーが発生することがあるので、それを消して.gitignoreに追加する必要がありました。   

## おわりに
このブログが少しでも誰かのお役に立てば幸いです。  
よければ[Twitter(新X)](https://x.com/kasumi_fukurou)をフォローしてください。
