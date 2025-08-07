import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';
import PaperForm from '@/components/PaperForm/PaperForm';

async function Dashboard() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	return (
		<>
			<PaperForm></PaperForm>
			<div>welcome, {data.user.email}</div>
		</>
	);
}

export default Dashboard;
