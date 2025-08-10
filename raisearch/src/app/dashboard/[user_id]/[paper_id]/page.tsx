import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';
import { getPaper } from '@/lib/db_service';
import TextViewer from '@/components/TextViewer';
import { Button } from '@/components/ui/button';

type CumulativePaper = {
	cumulativePaper: string[];
};

type Topics = {
	topics: string[];
};

type Paper = {
	id: number;
	created_at: string;
	user_id: string;
	title: string;
	topicsObject: Topics;
	linksObject: Object;
	dataBankObject: Object;
	cumulativePaperObject: CumulativePaper;
	summary: string;
	formattedPaper: string;
};

type Params = Promise<{ user_id: string; paper_id: string }>;

async function handleSave() {
	const supabase = await createClient();
}

export default async function Paper(props: { params: Params }) {
	const supabase = await createClient();

	const params = await props.params;

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	let paper: Paper = await getPaper(data.user.id, params.paper_id);

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
					<p className="text-3xl p-5 mb-5">{paper.title}</p>
					<TextViewer
						user_id={data.user.id}
						formattedPaper={paper.formattedPaper}
						id={paper.id.toString()}
					></TextViewer>
				</div>
				<div className="w-1/2 m-5 p-5">
					<p className="text-3xl p-5 mb-5">{paper.title}</p>
				</div>
			</div>
		</div>
	);
}
