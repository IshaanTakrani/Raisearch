import { NextRequest, NextResponse } from 'next/server';
import { generateTopics, generateTitle } from '@/lib/llmService';
import { getFirstPdfUrl } from '@/lib/search';
import { parsePdf } from '@/lib/parse_pdf';

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
		const generatedTitle = await generateTitle(
			`Topic:${body.prompt} Subtopics: ${topics.toString()}`
		);

		let paperInfo: paperInfo = {
			title: generatedTitle,
			topics: topics,
			links: [],
			dataBank: [],
			cumulativePaper: '',
		};

		for (const topic of Object.values(topics)) {
			let link = await getFirstPdfUrl(topic);
			paperInfo.links.push(link);
		}

		// TODO: remove this later
		paperInfo.links.push(
			'https://www.cityu.edu.hk/phy/appkchu/AP5301/Dispersion%20of%20light.pdf'
		);

		paperInfo.dataBank.push(await parsePdf(paperInfo.links[0]));

		paperInfo.links.push(
			'https://www.montana.edu/jshaw/documents/Snow%20sparkles%20-%20VollmerShaw%20-%20Phys%20Ed%202013.pdf'
		);

		paperInfo.dataBank.push(await parsePdf(paperInfo.links[1]));

		paperInfo.links.push(
			'https://www.davidpublisher.com/Public/uploads/Contribute/62e779cba9058.pdf'
		);

		paperInfo.dataBank.push(await parsePdf(paperInfo.links[2]));

		paperInfo.links.push(
			'https://journals.ametsoc.org/view/journals/bams/102/2/BAMS-D-20-0101.1.pdf'
		);

		paperInfo.dataBank.push(await parsePdf(paperInfo.links[3]));

		console.log(paperInfo);

		return NextResponse.json(topics);
	} catch (e) {
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}
