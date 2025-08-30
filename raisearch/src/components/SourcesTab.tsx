'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react'; // delete icon
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { extract_web_data } from '@/lib/parse_incoming_docs';
import {
	addSource,
	getSources,
	toggleSourceFlag,
	deleteSource,
} from '@/lib/db_service';

type Source = {
	id: string;
	created_at: string;
	name: string;
	url: string;
	data: string;
	paper_id: number;
	flagged: boolean;
};

function SourcesTab({ paper_id }: { paper_id: string }) {
	const [url, setUrl] = useState('');
	const [name, setName] = useState('');
	const [sources, setSources] = useState<Source[]>([]);

	// ✅ Fetch all sources on mount / paper_id change
	useEffect(() => {
		const fetchSources = async () => {
			try {
				const sources_from_db = await getSources(paper_id);
				setSources(sources_from_db ?? []);
			} catch (err) {
				console.error('Error loading sources:', err);
			}
		};

		if (paper_id) fetchSources();
	}, [paper_id]);

	// ✅ Add new source
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!url.trim()) return;

		const data = await extract_web_data(url);
		await addSource(paper_id, name, url, data);

		setUrl('');
		setName('');

		const sources_from_db = await getSources(paper_id);
		setSources(sources_from_db ?? []);
	};

	// ✅ Toggle flagged state
	const handleToggleFlag = async (id: string, currentFlag: boolean) => {
		try {
			await toggleSourceFlag(id, !currentFlag);
			setSources((prev) =>
				prev.map((src) =>
					src.id === id ? { ...src, flagged: !currentFlag } : src
				)
			);
		} catch (err) {
			console.error('Error toggling flag:', err);
		}
	};

	// ✅ Delete source
	const handleDelete = async (id: string) => {
		try {
			await deleteSource(id);
			setSources((prev) => prev.filter((src) => src.id !== id));
		} catch (err) {
			console.error('Error deleting source:', err);
		}
	};

	return (
		<Card className="w-full mx-auto shadow-lg rounded-2xl">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">Sources</CardTitle>
			</CardHeader>

			<form onSubmit={handleSubmit}>
				<CardContent className="flex flex-col gap-2">
					<Input
						type="text"
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
								onCheckedChange={() => handleToggleFlag(src.id, src.flagged)}
							/>
							<span className={!src.flagged ? 'line-through' : ''}>
								{src.name}
							</span>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => handleDelete(src.id)}
						>
							<Trash2 className="w-4 h-4" />
						</Button>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export default SourcesTab;
