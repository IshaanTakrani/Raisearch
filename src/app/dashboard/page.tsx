import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';
import RichTextEditor from '@/components/RichTextEditor';
import ChatSourceSidebar from '@/components/ChatSourceSidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		default: 'Redirecting...',
		template: '%s',
	},
	icons: {
		icon: '/favicon.ico', // ✅ This must point to public/favicon.ico
	},
};

type Params = Promise<{ user_id: string; paper_id: string }>;

async function PaperAssistant(props: { params: Params }) {
	const supabase = await createClient();
	const params = await props.params;

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	redirect(`/dashboard/${data.user.id}`);

	return <div>you are being redirected...</div>;
}

export default PaperAssistant;
