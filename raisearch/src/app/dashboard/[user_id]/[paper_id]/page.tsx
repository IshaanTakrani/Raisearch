import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';

type Params = Promise<{ user_id: string; paper_id: string }>;

export default async function Paper(props: { params: Params }) {
	const supabase = await createClient();

	const params = await props.params;

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	return (
		<>
			<div>{params.user_id}</div>
			<div>{params.paper_id}</div>
		</>
	);
}
