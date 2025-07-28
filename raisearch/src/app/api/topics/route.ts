import { NextRequest, NextResponse } from 'next/server';
import { generateTopics } from '@/lib/llmService';

export async function GET(req: NextRequest) {
	try {
		let topics = await generateTopics('Requirements Engineering');
		return NextResponse.json(topics, { status: 200 });
	} catch (e) {
		return NextResponse.json({ error: (e as Error).message }, { status: 500 });
	}
}
