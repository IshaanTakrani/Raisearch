import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';
import RichTextEditor from '@/components/RichTextEditor';

type Params = Promise<{ user_id: string; paper_id: string }>;

async function PaperAssistant(props: { params: Params }) {
	const supabase = await createClient();
	const params = await props.params;

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	// redirect(`/paper-assistant/${data.user.id}`);

	return (
		<>
			<div className="mt-30"></div>
			<RichTextEditor></RichTextEditor>
		</>
	);
}

export default PaperAssistant;
