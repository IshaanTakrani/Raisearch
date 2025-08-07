import { NextRequest, NextResponse } from 'next/server';
import {
	generateTopics,
	generateTitle,
	generateSection,
} from '@/lib/llmService';
import { getFirstPdfUrl } from '@/lib/search';
import { parsePdf } from '@/lib/parse_pdf';
import { addPaper } from '@/lib/db_service';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';

export async function POST(req: NextRequest) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

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

		await addPaper(data.user.id, paperInfo);
		return NextResponse.json(paperInfo);
	} catch (e) {
		console.log(e);
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}
