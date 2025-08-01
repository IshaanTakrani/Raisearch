import { NextRequest, NextResponse } from 'next/server';
import {
	generateTopics,
	generateTitle,
	generateSection,
} from '@/lib/llmService';
import { getFirstPdfUrl } from '@/lib/search';
import { parsePdf } from '@/lib/parse_pdf';

import { writeFile } from 'fs/promises';
import path, { parse } from 'path';

export async function POST(req: NextRequest) {
	interface paperInfo {
		title: string;
		topics: string[];
		links: string[];
		dataBank: string[];
		cumulativePaper: string;
	}

	interface sectionInfo {
		title: string;
		currTopic: string;
		currDataBank: string;
		cumulativePaper: string;
	}

	try {
		const body = await req.json();
		let topicsObject = await generateTopics(body.prompt);
		const topics: string[] = Object.values(topicsObject);

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

		let sectionInfo: sectionInfo = {
			title: generatedTitle,
			currTopic: '',
			currDataBank: '',
			cumulativePaper: '',
		};

		// for (const topic of Object.values(topics)) {
		// 	let link = await getFirstPdfUrl(topic);
		// 	paperInfo.links.push(link);
		// }

		for (let i = 0; i < topics.length; i++) {
			sectionInfo.currTopic = topics[i];
			paperInfo.links.push(await getFirstPdfUrl(topics[i]));
			paperInfo.dataBank.push(await parsePdf(paperInfo.links[i]));
			sectionInfo.currDataBank = await parsePdf(paperInfo.links[i]);

			let section = await generateSection(JSON.stringify(sectionInfo));

			paperInfo.cumulativePaper += `${section}\n`;
			sectionInfo.cumulativePaper += `${section}\n`;
			console.log(section);
		}

		sectionInfo.currDataBank = '';
		console.log(sectionInfo);

		// TODO: remove this later
		// paperInfo.links.push(
		// 	'https://www.cityu.edu.hk/phy/appkchu/AP5301/Dispersion%20of%20light.pdf'
		// );

		// paperInfo.dataBank.push(await parsePdf(paperInfo.links[0]));
		// sectionInfo.currDataBank = await parsePdf(paperInfo.links[0]); // TODO: this is bad, fix it later

		// paperInfo.links.push(
		// 	'https://www.montana.edu/jshaw/documents/Snow%20sparkles%20-%20VollmerShaw%20-%20Phys%20Ed%202013.pdf'
		// );

		// paperInfo.dataBank.push(await parsePdf(paperInfo.links[1]));
		// sectionInfo.currDataBank = await parsePdf(paperInfo.links[1]);

		// paperInfo.links.push(
		// 	'https://www.davidpublisher.com/Public/uploads/Contribute/62e779cba9058.pdf'
		// );

		// paperInfo.dataBank.push(await parsePdf(paperInfo.links[2]));
		// sectionInfo.currDataBank = await parsePdf(paperInfo.links[2]);

		// paperInfo.links.push(
		// 	'https://journals.ametsoc.org/view/journals/bams/102/2/BAMS-D-20-0101.1.pdf'
		// );

		// paperInfo.dataBank.push(await parsePdf(paperInfo.links[3]));
		// sectionInfo.currDataBank = await parsePdf(paperInfo.links[3]);

		// // const filePath = path.join(process.cwd(), 'paperInfo.txt');
		// await writeFile(
		// 	'paperInfo.txt',
		// 	JSON.stringify(paperInfo, null, 2),
		// 	'utf8'
		// );

		return NextResponse.json({ paper: paperInfo.cumulativePaper });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}
