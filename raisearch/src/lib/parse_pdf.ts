import pdf from 'pdf-parse';

export async function parsePdf(url: string): Promise<string | unknown> {
	try {
		const response = await fetch(url);
		const buffer = await response.arrayBuffer();
		const data = await pdf(Buffer.from(buffer));
		console.log(data.text);
		return data.text;
	} catch (e) {
		console.error(e);
		return `something went wrong ${e}`;
	}
}
