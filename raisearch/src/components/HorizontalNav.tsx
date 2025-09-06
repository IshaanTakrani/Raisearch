import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

function HorizontalNav() {
	return (
		<div className="sticky top-0 right-0 flex justify-between items-center w-full gap-6 p-4 pr-10 pl-6 m-0 text-[var(--foreground)] border-b bg-[var(--background)] shadow-sm">
			<img src="logo.png" className="h-10" alt="Logo" />

			<div className="flex gap-4">
				<Link href={'/dashboard'}>
					<Button>My Papers</Button>
				</Link>

				{/* <Link href={'/test-topics'}>
					<Button variant={'outline'}>Make a Paper</Button>
				</Link> */}
			</div>
		</div>
	);
}

export default HorizontalNav;
