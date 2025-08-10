import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';
import { getPaper } from '@/lib/db_service';
import TextViewer from '@/components/TextViewer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';

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

	return (
		<div className="mt-30">
			<div className="p-5 m-10 flex justify-between">
				{/* <p className="whitespace-pre-wrap">{paperAsString}</p> */}
				{/* <pre style={{ whiteSpace: 'pre-wrap' }}>{paperAsString}</pre> */}
				<div className="w-2/3 m-5 p-5">
					<p className="text-5xl text-primary">View and Edit Paper</p>
					<p className="text-2xl py-5 pb-0  text-[var(--green)]">
						{paper.title}
					</p>
					<p className="text-sm py-5  mb-2 text-[var(--green)]">
						Ctrl + S to Save
					</p>
					<TextViewer
						user_id={data.user.id}
						formattedPaper={paper.formattedPaper}
						id={paper.id.toString()}
					></TextViewer>
				</div>
				<div className="w-1/3 m-5 p-5">
					{/* <p className="text-xl p-5 mb-5 text-[var(--green)]">Revise paper</p> */}
				</div>
			</div>
			<Toaster></Toaster>
		</div>
	);
}
