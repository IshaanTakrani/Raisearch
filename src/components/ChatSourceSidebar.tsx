import React from 'react';

import { AppWindowIcon, CodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIAssistantTab from './AIAssistantTab';
import SourcesTab from './SourcesTab';

function ChatSourceSidebar({ paper_id }: { paper_id: string }) {
	return (
		<div
			className="
				fixed
				right-0
				top-16                       /* Start exactly below navbar (h-16 = 4rem = 64px) */
				h-[calc(100vh-4rem)]          /* Take full height minus navbar */
				w-[30%]
				overflow-y-auto
				bg-white
				border-l
				border-gray-200
				shadow-lg
				z-50
			"
		>
			<div className="flex flex-col items-center gap-6 p-6">
				<SourcesTab paper_id={paper_id} />
				<AIAssistantTab paper_id={paper_id} />
			</div>
		</div>
	);
}

export default ChatSourceSidebar;
