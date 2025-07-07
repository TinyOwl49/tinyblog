---
title: "Test Blog"
slug: "test-post"
date: "2025/02/28"
author: tinyowl
description: "ブログ機能チェックのためのテスト用記事です。"
thumbnail: "/imgs/bone_zaurusu.png"
tag: "programming, math, poem"
---

# Good Morning


```html
<script lang="ts">
	import MarkdownView from "$lib/MarkdownView.svelte";
	import { getAllArticles } from "$lib/articles";

	const articles = getAllArticles();
</script>

<h1>Welcome to SvelteKit</h1>
{#each articles as art}
	<div>
		<MarkdownView content={art.content} />
	</div>
{/each}
``` 


そこはかとなく生きています。
情報理論と数学、物理、天文に興味があります。
読書と自然が好きです。

*Fly me to the moon    
Let me play among the star   
Let me see what spring is like    
on Jupiter and Mars*


$$
y=x^2+2ax+a^2の2\leqq\;a\;\leqq3 での最大値、最小値を求めよ。
$$

`#ffce44`

>   **夏目漱石の手紙（久米正雄・芥川龍之介あて）**    
> 　勉強をしますか。何か書きますか。君方は新時代の作家になる積でせう。僕も其積であなた方の將來を見てゐます。どうぞ偉くなつて下さい。然し無暗にあせつては不可ません。たゞ牛のやうに圖々しく進んで行くのが大事です。文壇にもつと心持の好い愉快な空氣を輸入したいと思ひます。それから無暗にカタカナに平伏する癖をやめさせてやりたいと思ひます。是は兩君とも御同感だらうと思ひます。


? 定理1 準同型写像
$G_1, G_2$ を群，$\phi: G_1 \rightarrow G_2$ を写像とする．このとき，任意の $G$ の元 $x, y$ について $\phi(x y)=\phi(x) \phi(y)$ が成立するとき，$\phi$ は準同型であるという．
?

> $A_1, F_2$ を群，$\phi: A_1 \rightarrow F_2$ 

dddd
