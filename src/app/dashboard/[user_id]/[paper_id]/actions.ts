'use server';

import { getFlaggedSources } from '@/lib/db_service';
import { getInfoFromSources } from '@/lib/llmService';

export async function generateSummaryFromSources(
	user_id: string,
	paper_id: string,
	prompt: string
) {
	// type Source = {
	// 	id: number;
	// 	created_at: string;
	// 	url: string;
	// 	data: string;
	// 	paper_id: number;
	// 	flagged: boolean;
	// };

	let flagged_sources = await getFlaggedSources(paper_id);

	const inputString = JSON.stringify(flagged_sources ?? [], null, 2);

	let llmResponse = await getInfoFromSources(inputString, prompt);

	// console.log(llmResponse);
	return llmResponse;
}
