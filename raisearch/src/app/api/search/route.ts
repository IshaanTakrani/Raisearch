// src/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { searchGoogle } from '@/lib/search';

export async function GET(req: NextRequest) {
	try {
		const results = await searchGoogle('requirements engineering');
		return NextResponse.json({
			response: results,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 500 }
		);
	}
}
