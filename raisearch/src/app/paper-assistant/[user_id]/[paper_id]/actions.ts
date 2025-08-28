'use server';

import { getFlaggedSources } from '@/lib/db_service';

export async function generateSummaryFromSources(
	user_id: string,
	paper_id: string
) {
	let flagged_sources = await getFlaggedSources(paper_id);
	console.log(flagged_sources);
}
