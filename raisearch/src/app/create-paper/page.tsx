import { createClient } from '../../../utils/supabase/server';
import { redirect } from 'next/navigation';
import PromptSubmissionForm from '@/components/PromptSubmissionForm';
export default async function SimplePostPage() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect('/login');
	}

	return (
		<div className="flex-col justify-center align-middle w-full px-30">
			{/* <div className="mt-20 flex-col">
				<p className="text-5xl text-primary m-10 my-5 mt-30">Make a Paper</p>

				<p className="text-[var(--green)] m-10 my-5">
					Create a paper with just a Prompt
				</p>
			</div>

			<h1>Enter your topic below:</h1> */}
			<PromptSubmissionForm></PromptSubmissionForm>
		</div>
	);
}
