import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

function HorizontalNav() {
	return (
		<div className="fixed top-0 right-0 flex justify-between items-center w-full gap-6 p-4 pr-10 pl-6 m-0 text-[var(--foreground)] border-b bg-[var(--background)] shadow-sm">
			<img src="logo.png" className="h-10" alt="Logo" />

			<div className="flex gap-4">
				<Link href={'/dashboard'}>
					<button className="p-2 px-5 rounded-lg transition duration-100 ease-in-out hover:cursor-pointer border hover:border-[var(--green)]">
						My Papers
					</button>
				</Link>

				<Link href={'/test-topics'}>
					<button className="p-2 px-5 rounded-lg transition duration-100 ease-in-out border border-solid border-[var(--green)] hover:cursor-pointer bg-[var(--green)] text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--green)]">
						Make a Paper
					</button>
				</Link>
			</div>
		</div>
	);
}

export default HorizontalNav;
