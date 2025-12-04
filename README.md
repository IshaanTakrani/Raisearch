Raisearch: generate a research paper with just a prompt

User inputs a prompt and up to 5 subtopics
Brave search api is used to get information from the internet on each of these topics
Gemini API is used to generate a research paper based on the information from the brave search information
Return the research paper to the user

<!--
You are going to write me a section of a research paper based on a topic
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

Your paragraph should be in this format:
topic\n\tparagraph body -->
