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

export async function getPapers(user_id: string) {
	try {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from('papers') // your table name
			.select('*') // columns you want
			.eq('user_id', user_id); // filter

		if (error) {
			console.error(error);
			return null;
		}

		return data;
	} catch (e) {
		console.error(e);
	}
}
