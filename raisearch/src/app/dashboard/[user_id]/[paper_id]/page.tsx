import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';
import { getPaper } from '@/lib/db_service';

interface paperData {
	title: string;
	topics: string[];
	links: string[];
	dataBank: string[];
	cumulativePaper: string;
	summary: string;
}

type Paper = {
	id: number;
	created_at: string;
	user_id: string;
	paperData: paperData;
};

type Params = Promise<{ user_id: string; paper_id: string }>;

export default async function Paper(props: { params: Params }) {
	const supabase = await createClient();

	const params = await props.params;

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	let paper: Paper = await getPaper(data.user.id, params.paper_id);
	console.log(paper);

	for (let i = 0; i < paper.paperData.topics.length; i++) {
		console.log(paper.paperData.topics[i]);
		console.log(paper.paperData.cumulativePaper[i]);
	}

	return (
		<>
			<div className="mt-50">{paper.paperData.cumulativePaper}</div>
		</>
	);
}
