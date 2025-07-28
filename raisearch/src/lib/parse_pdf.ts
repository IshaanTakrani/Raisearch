import pdf from 'pdf-parse';

export async function parsePdf(url: string): Promise<Object> {
	try {
		const response = await fetch(url);

		const buffer = await response.arrayBuffer();
		const data = await pdf(Buffer.from(buffer));
		return { text: data.text };
	} catch (e) {
		console.error(e);
		return { error: e };
	}
}
