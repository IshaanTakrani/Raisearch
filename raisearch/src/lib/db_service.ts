'use server';
import { createClient } from '@/../utils/supabase/server';
import { title } from 'process';

//		title: string;
// 		topics: string[];
// 		links: string[];
// 		dataBank: string[];
// 		cumulativePaper: string[];
// 		summary: string;

interface paperInfo {
	title: string;
	topics: string[];
	links: string[];
	dataBank: string[];
	cumulativePaper: string[];
	summary: string;
	formattedPaper: string;
}

export async function addPaper(user_id: string, paperData: paperInfo) {
	try {
		const supabase = await createClient();

		const { error } = await supabase.from('papers').insert({
			user_id: user_id,
			title: paperData.title,
			topicsObject: { topics: paperData.topics },
			dataBankObject: { dataBank: paperData.dataBank },
			cumulativePaperObject: {
				cumulativePaper: paperData.cumulativePaper,
			},
			summary: paperData.summary,
			linksObject: { links: paperData.links },
			formattedPaper: paperData.formattedPaper,
		});

		console.log(error);
	} catch (e) {
		console.error(e);
	}
}

// export async function updatePaper(
// 	user_id: string,
// 	paper_id: number,
// 	formattedPaper: string
// ) {
// 	try {
// 		const supabase = await createClient();
// 		console.log('updating...');
// 		console.log(formattedPaper);
// 		console.log('paper_id');
// 		console.log(paper_id);

// 		const { error } = await supabase
// 			.from('papers')
// 			.update({ formattedPaper: 'yo' })
// 			.eq('id', paper_id)
// 			.eq('user_id', user_id);

// 		console.log(error);
// 	} catch (e) {
// 		console.error(e);
// 	}
// }
export async function updatePaper(
	user_id: string,
	paper_id: string,
	formattedPaper: string
) {
	try {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from('papers')
			.update({ formattedPaper: formattedPaper })
			.eq('user_id', user_id)
			.eq('id', parseInt(paper_id, 10))
			.single();

		if (error) {
			console.error(error);
			return null;
		}

		console.log(data);
	} catch (e) {
		console.error(e);
		return null;
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

export async function getPaper(user_id: string, paper_id: string) {
	try {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from('papers')
			.select('*')
			.eq('user_id', user_id)
			.eq('id', parseInt(paper_id, 10))
			.single();

		if (error) {
			console.error(error);
			return null;
		}

		return data;
	} catch (e) {
		console.error(e);
		return null;
	}
}
