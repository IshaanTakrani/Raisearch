import React from 'react';
import { Button } from './ui/button';
import styles from './PapersTable.module.css';

interface paperData {
	title: string;
	topics: string[];
	links: string[];
	dataBank: string[];
	cumulativePaper: string;
	summary: string;
}

type Paper = {
	id: number;
	created_at: string;
	user_id: string;
	paperData: paperData;
};

interface PapersTableProps {
	papers: Paper[];
}

function PapersTable({ papers }: PapersTableProps) {
	return (
		<div className="overflow-hidden rounded-3xl border border-border border-solid w-2/3">
			<table className="flex-1 w-full rounded-lg border-collapse">
				<thead>
					<tr className="bg-secondary">
						<th className="px-4 py-3 w-1/4 text-left text-primary text-sm font-medium leading-normal rounded-tl-lg">
							Title
						</th>
						<th className="px-4 py-3 text-left w-2/4 text-primary text-sm font-medium leading-normal">
							Summary
						</th>
						<th className="px-4 py-3 text-left w-1/4 text-primary text-sm font-medium leading-normal rounded-tr-lg">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{papers.map((paper) => (
						<tr key={paper.id} className="border-t border-t-border">
							<td className="h-15 px-4 py-6 w-1/4 text-primary text-md font-normal leading-normal">
								{paper.paperData.title}
							</td>
							<td className="h-15 px-4 py-6 w-2/4 text-sm text-[var(--green)] font-normal leading-normal">
								{paper.paperData.summary}
							</td>
							<td className="h-15 px-4 py-6 w-1/4 text-[var(--green)] text-sm font-bold leading-normal tracking-[0.015em]">
								<Button variant="outline">View</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default PapersTable;
