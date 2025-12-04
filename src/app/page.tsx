import React from 'react';
import { redirect } from 'next/navigation';

function page() {
	redirect('/login');
	return <></>;
}

export default page;
