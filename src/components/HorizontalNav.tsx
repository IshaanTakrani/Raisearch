import React from 'react';
import ProfileButton from './ProfileButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signout } from '@/app/auth/signout/actions';
import { createClient } from '@/../utils/supabase/server';

function HorizontalNav() {
	return (
		<div className="sticky top-0 right-0 flex justify-between items-center w-full gap-6 p-4 pr-10 pl-6 m-0 text-[var(--foreground)] border-b bg-[var(--background)] shadow-sm z-[9999]">
			<img src="/logo.png" className="h-10" alt="Logo" />

			<div className="flex gap-4">
				<Link href={'/dashboard'}>
					<Button>My Papers</Button>
				</Link>

				<Button variant={'outline'} onClick={signout}>
					Log out
				</Button>
			</div>
		</div>
	);
}

export default HorizontalNav;
