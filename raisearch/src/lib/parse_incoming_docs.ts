'use server';

import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export async function extract_web_data(url: string): Promise<string> {
	try {
		const response = await fetch(url);
		const html = await response.text();

		const dom = new JSDOM(html, { url });
		const doc = dom.window.document;

		const reader = new Readability(doc);
		const article = reader.parse();

		return article?.textContent || '';
	} catch (e) {
		console.error(e);
		return `something went wrong ${e}`;
	}
}
