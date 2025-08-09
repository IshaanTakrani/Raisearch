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
				text: `When given a topic, you must generate sub-topics based on the topic for the purpose of being sections of a research paper. Based on how broad the topic is, you may choose anywhere from two to 5 sub-topics. The more broad a topic, the more subtopics. Each subtopic should be understandable on it's own, and not rely on the context of any other subtopic or the main topic overall. Think: what should they be in a research paper format? There should be research on these subtopics online as well. Optimize the subtopic names to get many results on google, make them search friendly. The subtopics should should be common topics, not too niche`,
			},
		],
	};
	const model = 'gemini-2.5-flash-lite';
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

	return JSON.parse(response.text ?? '');
}

// export async function generateTitle(prompt: string): Promise<string> {
// 	const ai = new GoogleGenAI({
// 		apiKey: process.env.GEMINI_API_KEY,
// 	});
// 	const config = {
// 		responseMimeType: 'application/json',
// 		systemInstruction: [
// 			{
// 				text: `Given a topic and subtopics, generate a title for a research paper based on the topic and subtopics. No other formarring, nothing at all, just the title as a string`,
// 			},
// 		],
// 	};
// 	const model = 'gemini-2.5-flash-lite';
// 	const contents = [
// 		{
// 			role: 'user',
// 			parts: [
// 				{
// 					text: `${prompt}`,
// 				},
// 			],
// 		},
// 	];

// 	const response = await ai.models.generateContent({
// 		model,
// 		config,
// 		contents,
// 	});
// 	return response.text ?? '';
// }

export async function generateTitle(prompt: string): Promise<string> {
	const ai = new GoogleGenAI({
		apiKey: process.env.GEMINI_API_KEY,
	});
	const config = {};
	const model = 'gemma-3-12b-it';
	const contents = [
		{
			role: 'user',
			parts: [
				{
					text: `Given a topic and subtopics, generate a title for a research paper based on the topic and subtopics. No other formarring, nothing at all, just the title as a string ${prompt}`,
				},
			],
		},
	];

	const response = await ai.models.generateContent({
		model,
		config,
		contents,
	});
	return response.text ?? '';
}

// generateSection

export async function generateSection(prompt: string): Promise<string> {
	const ai = new GoogleGenAI({
		apiKey: process.env.GEMINI_API_KEY,
	});
	const config = {
		thinkingConfig: {
			thinkingBudget: -1,
		},
		systemInstruction: [
			{
				text: `You are going to write me a section of a research paper based on a topic
Given a JSON object in this format:
interface paperInfoforParagraph {
		title: string;
		topics: string[];
		dataBank: string;
		cumulativePaper: string;
}

The cumulative paper may be empty, but there will always be at least one topic, and there will always be at least one link in the links object, and at least one string in the databank. Here is a breakdown:
title: title of the research paper
topics: subtopics, or headings, of the research paper
dataBank: Data that must be parsed, summarized, and used for the research paper
cumulativePaper: the research paper so far

Here is your job: You must generate a paragraph of the research paper, on the last topic in the topics list. only use the last object in the topics list. Think about what the last one is, then use the last one only.
for this paragraph, you must use only the information in the dataBank, if some data must be added, you may add your own, but the information in the dataBank must be what the paragraph is based on
You must be aware of the research paper so far. You may refer back to previous sections of it if you wish, but do not restate informaiton that is already in the cumulativePaper string

Do not include the topic at the beginning of the section. Only the string of the paragraph.

`,
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
	return response.text ?? '';
}

export async function generateSummary(paperContent: string): Promise<string> {
	const ai = new GoogleGenAI({
		apiKey: process.env.GEMINI_API_KEY,
	});
	const config = {};
	const model = 'gemma-3-12b-it';
	const contents = [
		{
			role: 'user',
			parts: [
				{
					text: `Given a research paper, summarize it in no more than 2 sentences, 20 words. DO NOT inclide any text other than the summary, nothing else at all, no boilerplate, just the summary. Paper: ${paperContent}`,
				},
			],
		},
	];

	const response = await ai.models.generateContent({
		model,
		config,
		contents,
	});
	return response.text ?? '';
}
