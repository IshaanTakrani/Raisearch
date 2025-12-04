'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { createAssistPaper } from '@/lib/db_service';

export function AddPaperButton({ user_id }: { user_id: string }) {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [loading, setLoading] = useState(false);

	// Handles creating a paper
	const handleCreate = async () => {
		if (!title.trim()) {
			toast.error('Paper name cannot be empty');
			return;
		}

		setLoading(true);

		try {
			// const res = await fetch('/api/papers', {
			// 	method: 'POST',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({ user_id: userId, name: title }),
			// });

			// if (!res.ok) throw new Error('Failed to create paper');

			await createAssistPaper(user_id, title);

			toast.success('Paper created successfully!');
			setTitle('');
			setOpen(false);
			window.location.reload();
		} catch (err) {
			console.error(err);
			toast.error('Error creating paper');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="flex gap-2">
					<Plus className="h-5 w-5" />
					New Paper
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a new paper</DialogTitle>
				</DialogHeader>

				<div className="space-y-4">
					<Input
						placeholder="Enter paper name"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button onClick={handleCreate} disabled={loading}>
						{loading ? 'Creating...' : 'Create'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
