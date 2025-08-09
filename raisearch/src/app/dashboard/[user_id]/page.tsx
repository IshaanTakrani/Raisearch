import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';
import PaperForm from '@/components/PaperForm/PaperForm';
import PapersTable from '@/components/PapersTable';
import { getPapers } from '@/lib/db_service';

interface PageProps {
	params: {
		user_id: string;
	};
}

async function Dashboard({ params }: PageProps) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	if (data.user.id != params.user_id) {
		redirect('/login');
	}

	let papers = await getPapers(data.user.id);
	console.log(papers);

	return (
		<>
			<div>{params.user_id}</div>
			{/* <PaperForm></PaperForm> */}
			<PapersTable papers={papers ?? []}></PapersTable>
			<div>welcome, {data.user.email}</div>
		</>
	);
}

export default Dashboard;
