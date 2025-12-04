'use client';
import React from 'react';
import { Button } from './ui/button';
import styles from './PapersTable.module.css';
import Link from 'next/link';
import path from 'path';
import { usePathname } from 'next/navigation';

// interface paperData {}

type Paper = {
	id: number;
	created_at: string;
	user_id: string;
	title: string;
	topicsObject: Object;
	linksObject: Object;
	dataBankObject: Object;
	cumulativePaperObject: Object;
	summary: string;
};

interface PapersTableProps {
	papers: Paper[];
}

function PapersTable({ papers }: PapersTableProps) {
	return (
		<div className="overflow-hidden rounded-3xl border border-border border-solid w-full m-10">
			<table className="flex-1 w-full rounded-lg border-collapse">
				<thead>
					<tr className="bg-secondary">
						<th className="px-4 py-3 w-1/4 text-left text-primary text-md leading-normal rounded-tl-lg">
							Title
						</th>
						<th className="px-4 py-3 text-left w-2/4 text-primary text-md leading-normal">
							Summary
						</th>
						<th className="px-4 py-3 text-left w-1/4 text-primary text-md leading-normal rounded-tr-lg">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{papers.map((paper) => (
						<tr key={paper.id} className="border-t border-t-border">
							<td className="h-15 px-4 py-6 w-1/4 text-primary text-md font-normal leading-normal">
								{paper.title}
							</td>
							<td className="h-15 px-4 py-6 w-2/4 text-sm text-[var(--green)] font-normal leading-normal">
								{paper.summary}
							</td>
							<td className="h-15 px-4 py-6 w-1/4 text-[var(--green)] text-sm font-bold leading-normal tracking-[0.015em]">
								<Link href={`${usePathname()}/${paper.id}`}>
									<Button variant="outline">View</Button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default PapersTable;
