import { NextRequest, NextResponse } from 'next/server';
import { getFirstPdfUrl } from '@/lib/search';
import { parsePdf } from '@/lib/parse_pdf';

export async function GET(req: NextRequest) {
	try {
		let url = await getFirstPdfUrl('Requirements Elicitation Techniques');
		console.log(url);
		let pdf_content = await parsePdf(url);
		return NextResponse.json(
			{
				pdf_content: pdf_content,
			},
			{ status: 200 }
		);
	} catch (e) {}
}
