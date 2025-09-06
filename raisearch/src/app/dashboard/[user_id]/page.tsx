// import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/../utils/supabase/server';
import PaperForm from '@/components/PaperForm/PaperForm';
import AssistPapersTable from '@/components/AssistPapersTable';
import { getAssistPapers } from '@/lib/db_service';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { AddPaperButton } from '@/components/AddPaperButton';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		default: 'Dashboard',
		template: '%s | Raisearch',
	},
	icons: {
		icon: '/favicon.ico', // ✅ This must point to public/favicon.ico
	},
};

type Params = Promise<{ user_id: string; paper_id: string }>;

async function AssistDashboard(props: { params: Params }) {
	const supabase = await createClient();
	const params = await props.params;

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user || data.user.id !== params.user_id) {
		redirect('/login');
	}

	let papers = await getAssistPapers(data.user.id);
	console.log(papers);

	return (
		<div className="flex-col justify-center align-middle w-full px-30">
			{/* Header Section */}
			<div className="flex flex-row justify-between items-center">
				<div>
					<p className="text-5xl text-primary m-10 my-5 mt-30">My Papers</p>
					<p className="text-[var(--green)] m-10 my-5">
						All your papers, in one place
					</p>
				</div>

				{/* Add Paper Button */}
				<AddPaperButton user_id={data.user.id} />
			</div>

			{/* Table */}
			<AssistPapersTable papers={papers ?? []} />
		</div>
	);
}

export default AssistDashboard;
