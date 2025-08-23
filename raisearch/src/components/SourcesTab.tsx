'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react'; // delete icon
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';

import { extract_web_data } from '@/lib/parse_incoming_docs';

type Source = {
	id: string;
	name: string;
	url: string;
	flagged: boolean;
};

function SourcesTab() {
	const [url, setUrl] = useState('');
	const [name, setName] = useState('');
	const [sources, setSources] = useState<Source[]>([]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!url.trim()) return;

		console.log('Submitted URL:', url);
		const website_data = await extract_web_data(url);
		console.log(name);
		console.log(website_data);

		const newSource = setUrl('');
		setName('');
	};

	return (
		<Card className="max-w-md mx-auto shadow-lg rounded-2xl">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">Add a Source</CardTitle>
			</CardHeader>

			<form onSubmit={handleSubmit}>
				<CardContent className="flex flex-col gap-2">
					<Input
						type="name"
						placeholder="Enter a Name for the source"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<Input
						type="url"
						placeholder="Enter a URL"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						required
					/>
					<Button type="submit">Submit</Button>
				</CardContent>
			</form>

			{/* <CardFooter className="text-sm text-muted-foreground">
        Paste a valid URL and click submit.
      </CardFooter> */}
		</Card>
	);
}

export default SourcesTab;
