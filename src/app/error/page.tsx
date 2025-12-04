'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function ErrorPage() {
	return (
		<div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
			<p className="text-4xl m-5">Something went wrong. Please try again</p>
			<br />
			<div className="flex flex-row justify-center align-middle">
				<Link href={'/login'} className="m-5">
					<Button className="bg-[var(--green)]">Login</Button>
				</Link>
				<Link href={'/signup'} className="m-5">
					<Button className="bg-[var(--green)]">signup</Button>
				</Link>
			</div>
		</div>
	);
}

export default ErrorPage;
