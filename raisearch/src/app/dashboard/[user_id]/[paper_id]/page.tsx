import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';
import { getPaper } from '@/lib/db_service';
import TextViewer from '@/components/TextViewer';
import { Button } from '@/components/ui/button';

interface paperData {
	title: string;
	topics: string[];
	links: string[];
	dataBank: string[];
	cumulativePaper: string[];
	summary: string;
}

type Paper = {
	id: number;
	created_at: string;
	user_id: string;
	paperData: paperData;
};

type Params = Promise<{ user_id: string; paper_id: string }>;

async function handleSave() {
	const supabase = await createClient();
	// await supabase.upda
}

export default async function Paper(props: { params: Params }) {
	const supabase = await createClient();

	const params = await props.params;

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	let paper: Paper = await getPaper(data.user.id, params.paper_id);
	console.log(paper);

	// for (let i = 0; i < paper.paperData.topics.length; i++) {
	// 	console.log(paper.paperData.topics[i]);
	// 	console.log(paper.paperData.cumulativePaper[i]);
	// }

	// let paperAsString: string = '';

	// for (let i = 0; i < paper.paperData.topics.length; i++) {
	// 	paperAsString += paper.paperData.topics[i];
	// 	paperAsString += '\n';
	// 	paperAsString += paper.paperData.cumulativePaper[i];
	// 	paperAsString += '\n\n';
	// }

	return (
		<div>
			<div className="mt-30 p-5 m-10 flex justify-between">
				{/* <p className="whitespace-pre-wrap">{paperAsString}</p> */}
				{/* <pre style={{ whiteSpace: 'pre-wrap' }}>{paperAsString}</pre> */}
				<div className="w-1/2 m-5 p-5">
					<p className="text-3xl p-5 mb-5">{paper.paperData.title}</p>
					<TextViewer
						cumulativePaper={paper.paperData.cumulativePaper}
						topics={paper.paperData.topics}
					></TextViewer>
				</div>
				<div className="w-1/2 m-5 p-5">
					<p className="text-3xl p-5 mb-5">{paper.paperData.title}</p>
					<Button onClick={handleSave}>Save</Button>
				</div>
			</div>
		</div>
	);
}
