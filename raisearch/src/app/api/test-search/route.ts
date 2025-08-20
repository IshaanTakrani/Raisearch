import { NextRequest, NextResponse } from 'next/server';
import { extract_web_data } from '@/lib/parse_incoming_docs';

export async function GET(req: NextRequest) {
	try {
		let data = await extract_web_data(
			'https://en.wikipedia.org/wiki/Lateral_line'
		);
		return NextResponse.json({ message: data }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ error: e }, { status: 500 });
	}
}
