import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';
import RichTextEditor from '@/components/RichTextEditor';
import ChatSourceSidebar from '@/components/ChatSourceSidebar';
import { getAssistPaper } from '@/lib/db_service';
import { Metadata } from 'next';

type Params = Promise<{ user_id: string; paper_id: string }>;

// async function handleSave() {
// 	const supabase = await createClient();
// }

export default async function Paper(props: { params: Params }) {
	const supabase = await createClient();

	const params = await props.params;

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	const paper = await getAssistPaper(params.paper_id, data.user.id);
	console.log('paper: ');
	console.log(paper.paper);

	return (
		<>
			<div className="flex flex-row w-full gap-10 p-10">
				<div className="flex-2 w-full">
					<RichTextEditor
						paper_content={paper.paper}
						paper_id={params.paper_id}
						user_id={data.user.id}
					></RichTextEditor>
				</div>

				<div className="flex-1 w-full">
					<ChatSourceSidebar paper_id={params.paper_id}></ChatSourceSidebar>
				</div>
			</div>
		</>
	);
}
