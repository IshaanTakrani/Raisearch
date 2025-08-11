'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function ErrorPage() {
	return (
		<div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
			<p className="text-xl m-5">
				Something went wrong. You may already have an account.
			</p>
			<br />
			<Link href={'/login'} className="m-5">
				<Button className="bg-[var(--green)]">Login</Button>
			</Link>
		</div>
	);
}

export default ErrorPage;
