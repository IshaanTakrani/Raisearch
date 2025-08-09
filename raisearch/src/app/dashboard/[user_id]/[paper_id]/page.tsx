import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';

export default async function Page({
	params,
}: {
	params: { user_id: string; paper_id: string };
}) {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	if (data.user.id !== params.user_id) {
		redirect('/login');
	}

	return (
		<>
			<div>{params.user_id}</div>
			<div>{params.paper_id}</div>
		</>
	);
}
