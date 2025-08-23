import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';

type Params = Promise<{ user_id: string; paper_id: string }>;

async function Dashboard(props: { params: Params }) {
	const supabase = await createClient();
	const params = await props.params;

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user || data.user.id != params.user_id) {
		redirect('/login');
	}

	// if (data.user.id != params.user_id) {
	// 	redirect('/login');
	// }

	return (
		<>
			<div className="mt-30">This is the user page</div>
			<p>welcome, {data.user.id}</p>
		</>
	);
}

export default Dashboard;
