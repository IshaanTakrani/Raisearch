import { GoogleGenAI, Type } from '@google/genai';

export async function generateTopics(prompt: string): Promise<Object> {
	const ai = new GoogleGenAI({
		apiKey: process.env.GEMINI_API_KEY,
	});
	const config = {
		thinkingConfig: {
			thinkingBudget: -1,
		},
		responseMimeType: 'application/json',
		responseSchema: {
			type: Type.OBJECT,
			required: ['sub_01', 'sub_02', 'sub_03'],
			properties: {
				sub_01: {
					type: Type.STRING,
				},
				sub_02: {
					type: Type.STRING,
				},
				sub_03: {
					type: Type.STRING,
				},
				sub_04: {
					type: Type.STRING,
				},
				sub_05: {
					type: Type.STRING,
				},
			},
		},
		systemInstruction: [
			{
				text: `Given a topic, generate three to five subtopics based on that initial topic. These subtopics will be used as sections of a research paper about the main topic. Think: what should they be in a research paper format? There should be research on these subtopics online as well. Optimize the subtopic names to get many results on google, make them search friendly. The subtopics should should be common topics, not too niche`,
			},
		],
	};
	const model = 'gemini-2.5-flash';
	const contents = [
		{
			role: 'user',
			parts: [
				{
					text: `${prompt}`,
				},
			],
		},
	];

	const response = await ai.models.generateContent({
		model,
		config,
		contents,
	});
	let fileIndex = 0;
	return JSON.parse(response.text ?? '');
}
