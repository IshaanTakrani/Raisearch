import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // specify .env.local explicitly

const API_KEY = process.env.GOOGLE_SEARCH_KEY;
const CX = process.env.GOOGLE_SEARCH_CX;

export async function getFirstPdfUrl(query: string): Promise<string> {
	const res = await fetch(
		`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(
			query
		)}&fileType=pdf`
	);
	const data = await res.json();
	return data.items[0].link;
	// return 'http://web.eecs.umich.edu/~weimerw/2022-481F/readings/requirements.pdf';
}

// searchGoogle('requirements engineering').then((res) => {
// 	console.log(res);
// });
