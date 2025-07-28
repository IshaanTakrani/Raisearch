import { NextRequest, NextResponse } from 'next/server';
import { generateTopics } from '@/lib/llmService';
import { getFirstPdfUrl } from '@/lib/search';

export async function POST(req: NextRequest) {
	interface paperInfo {
		title: string;
		topics: string[];
		links: string[];
		dataBank: string[];
		cumulativePaper: string;
	}

	try {
		const body = await req.json();
		let topicsObject = await generateTopics(body.prompt);
		const topics: string[] = Object.values(topicsObject);
		// console.log(topics);
		console.log(topics);

		let paperInfo: paperInfo = {
			title: 'TODO: change title placeholder',
			topics: topics,
			links: [],
			dataBank: [],
			cumulativePaper: '',
		};

		for (const topic of Object.values(topics)) {
			let link = await getFirstPdfUrl(topic);
			paperInfo.links.push(link);
		}

		return NextResponse.json(topics);
	} catch (e) {
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}
