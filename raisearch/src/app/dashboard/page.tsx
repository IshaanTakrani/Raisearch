import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';
import PaperForm from '@/components/PaperForm/PaperForm';
import PapersTable from '@/components/PapersTable';
import { getPapers } from '@/lib/db_service';

type Params = Promise<{ user_id: string; paper_id: string }>;

async function Dashboard(props: { params: Params }) {
	const supabase = await createClient();
	const params = await props.params;

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	// if (data.user.id != params.user_id) {
	// 	redirect('/login');
	// }

	let papers = await getPapers(data.user.id);
	console.log(papers);

	redirect(`/dashboard/e63123be-5e38-4cda-84b9-e915b47a446e`);

	return <></>;
}

export default Dashboard;
