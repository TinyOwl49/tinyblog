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
プログラミングが趣味で、PythonやC#、Typescript、Nimあたりがちょっとだけできます。
Rustは勉強中です。
### このブログを作った理由
自分の興味のあることを好き勝手に喋ったり、調べたことを残しておくために作りました。
他ブログ(Noteとか[Zenn](https://zenn.dev/tinyowl)とか)にあげるまでもないことを記事にしていく予定です。   
学部生が学び途中のことを喋るので、間違っていることが多々あると思います。
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
おすすめ記事: [Svelteのすすめ](https://qiita.com/kurata04/items/d39e004dc3c837bfc4a1)

### 記事の読み込み
記事はMarkdown形式で書いています。例えばこの記事は以下のような感じです。
```markdown
---
title: "このブログの説明"
slug: "what-is-this-blog"
date: "2025-3-5"
...
tag: "programming, math, poem"
---
## 自己紹介
**ねこふくろういぬ**と申します。
```
Sveltekit側では
```ts
const files = import.meta.glob(`../../articles/[^_]*.md`, { eager: true, query: '?raw' })
```
という感じでmarkdownファイルを読み込んで、marked.jsを使って表示させています。
markdownを動的に読み込みたかったのでこのような方法をとっています。
もっといい方法があればぜひ教えてください。
### Github Pagesにデプロイ
Sveltekitでは静的サイトを簡単に生成できるので、Github Pagesと組み合わせることで楽にブログを作ることができます。すばらしい。  
参考: [公式Doc](https://svelte.jp/docs/kit/adapter-static)
## おわりに
このブログが少しでも誰かのお役に立てば幸いです。  
よければ[Twitter(新X)](https://x.com/kasumi_fukurou)のフォローをお願いします。
