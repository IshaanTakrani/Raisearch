import React from 'react';
import { Button } from './ui/button';

function HorizontalNav() {
	return (
		<div className="fixed top-0 right-0 flex justify-between items-center w-full gap-6 p-4 pr-10 pl-6 m-0 text-[var(--foreground)] border-b">
			<img src="logo.png" className="h-10" alt="Logo" />

			<div className="flex gap-4">
				<button className="p-2 px-5 rounded-lg transition duration-100 ease-in-out hover:cursor-pointer border hover:border-[var(--primary)]">
					Dashboard
				</button>
				<button className="p-2 px-5 rounded-lg transition duration-100 ease-in-out hover:cursor-pointer border hover:border-[var(--primary)]">
					My Papers
				</button>
				<button className="p-2 px-5 rounded-lg transition duration-100 ease-in-out border border-solid border-[var(--primary)] hover:cursor-pointer bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--primary)]">
					Make a Paper
				</button>
			</div>
		</div>
	);
}

export default HorizontalNav;
