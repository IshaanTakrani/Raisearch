import { parsePdf } from '@/lib/parse_pdf';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		let content = await parsePdf(
			'https://www.cs.toronto.edu/~sme/papers/2004/FoRE-chapter01-v7.pdf'
		);
		return NextResponse.json(content);
	} catch (e) {
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}
