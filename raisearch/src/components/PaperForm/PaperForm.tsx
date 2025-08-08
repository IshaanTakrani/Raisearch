'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

function PaperForm() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<Button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				{count}
			</Button>
		</div>
	);
}

export default PaperForm;
