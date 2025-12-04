import pdf from 'pdf-parse';

export async function parsePdf(url: string): Promise<string> {
	try {
		const response = await fetch(url);
		const buffer = await response.arrayBuffer();
		const data = await pdf(Buffer.from(buffer));
		return data.text;
	} catch (e) {
		console.error(e);
		return `something went wrong ${e}`;
	}
}
