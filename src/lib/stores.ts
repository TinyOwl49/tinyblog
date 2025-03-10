import { readable } from "svelte/store";
import { type ArticleData } from "./articles";
import { getAllArticles } from "$lib/articles";

export const articles = readable<ArticleData[]>([], (set) => {
	set(getAllArticles());
});
