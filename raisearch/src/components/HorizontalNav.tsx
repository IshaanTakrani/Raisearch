import React from 'react';
import { Button } from './ui/button';

function HorizontalNav() {
	return (
		<div className="fixed top-0 right-0 flex gap-6 p-3 px-10 m-0 w-full justify-end text-[var(--foreground)] border-b-1 border-gray-300 border-solid">
			<button className="p-2 rounded-lg">Dashboard</button>
			<button className="p-2 rounded-lg">My Papers</button>
			<button className="p-2 rounded-lg bg-[var(--signature-orange)] text-[var(--background)]">
				Make a Paper
			</button>
		</div>
	);
}

export default HorizontalNav;
