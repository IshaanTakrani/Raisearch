'use client';

import React, { useState, useEffect } from 'react';
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
import { addSource, getSources } from '@/lib/db_service';

type Source = {
	id: string;
	created_at: string;
	name: string;
	url: string;
	data: string;
	paper_id: number;
};

function SourcesTab({ paper_id }: { paper_id: string }) {
	const [url, setUrl] = useState('');
	const [name, setName] = useState('');
	const [sources, setSources] = useState<any[]>([]);

	useEffect(() => {
		const fetchSources = async () => {
			try {
				const sources_from_db = await getSources(paper_id);
				setSources(sources_from_db ?? []);
			} catch (err) {
				console.error('Error loading sources:', err);
			}
		};

		if (paper_id) {
			fetchSources();
		}
	}, [paper_id]); // runs when paper_id changes

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!url.trim()) return;

		console.log('Submitted URL:', url);
		const data = await extract_web_data(url);
		console.log(name);

		addSource(paper_id, name, url, data);

		setUrl('');
		setName('');

		let sources_from_db = await getSources(paper_id);
		console.log(sources_from_db);
		// TODO: fix set sources to db value
		setSources(sources_from_db ?? []);
		console.log(sources);
	};

	return (
		<Card className="w-full mx-auto shadow-lg rounded-2xl">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">Sources</CardTitle>
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

			<CardContent className="flex flex-col gap-2 mt-4">
				{sources.map((src) => (
					<div
						key={src.id}
						className="flex items-center justify-between rounded-lg border p-2"
					>
						<div className="flex items-center gap-2">
							<Checkbox
								checked={src.flagged}
								// onCheckedChange={() => toggleFlag(src.id)}
							/>
							<span className={src.flagged ? 'line-through' : ''}>
								{src.name}
							</span>
						</div>
						<Button
							variant="ghost"
							size="icon"
							// onClick={() => deleteSource(src.id)}
						>
							<Trash2 className="w-4 h-4" />
						</Button>
					</div>
				))}
			</CardContent>

			{/* <CardFooter className="text-sm text-muted-foreground">
        Paste a valid URL and click submit.
      </CardFooter> */}
		</Card>
	);
}

export default SourcesTab;
