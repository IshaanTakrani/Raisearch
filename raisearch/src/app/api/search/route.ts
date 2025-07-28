// src/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getFirstPdfUrl } from '@/lib/search';

export async function GET(req: NextRequest) {
	try {
		const results = await getFirstPdfUrl('Requirements Elicitation Techniques');
		return NextResponse.json({
			response: results,
		});
	} catch (e) {
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}

/*


*/
