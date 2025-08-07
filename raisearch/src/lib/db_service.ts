import { createClient } from '@/../utils/supabase/server';

export async function addPaper(user_id: string, paperData: Object) {
	try {
		const supabase = await createClient();

		const { error } = await supabase
			.from('papers')
			.insert({ user_id: user_id, paperData: paperData });
	} catch (e) {
		console.error(e);
	}
}
