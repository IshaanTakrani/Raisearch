import { NextRequest, NextResponse } from 'next/server';
import { generateTopics } from '@/lib/llmService';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		let topics = await generateTopics(body.prompt);
		return NextResponse.json(topics);
	} catch (e) {
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}
