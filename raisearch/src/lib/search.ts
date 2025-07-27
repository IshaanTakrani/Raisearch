import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // specify .env.local explicitly

const API_KEY = process.env.GOOGLE_SEARCH_KEY;
const CX = process.env.GOOGLE_SEARCH_CX;

console.log('GOOGLE_SEARCH_KEY:', API_KEY);
console.log('GOOGLE_SEARCH_CX:', CX);

export async function searchGoogle(query: string) {
	const res = await fetch(
		`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(
			query
		)}`
	);
	const data = await res.json();
	return data.items;
}

// searchGoogle('requirements engineering').then((res) => {
// 	console.log(res);
// });
