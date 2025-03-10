import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { articles } from '$lib/stores';
import { get } from 'svelte/store';

export const load: PageLoad = ({ params }) => {
	const arts = get(articles);

	const currentArt = arts.find(v => v.slug === params.slug);
	if (currentArt) {
		return currentArt;
	}

	error(404, 'Not found');
};
