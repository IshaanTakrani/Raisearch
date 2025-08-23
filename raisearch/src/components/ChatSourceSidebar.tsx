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
		<div className="flex w-full max-w-sm flex-col gap-6">
			<Tabs defaultValue="AI Assistant">
				<TabsList>
					<TabsTrigger value="AI Assistant">AI Assistant</TabsTrigger>
					<TabsTrigger value="Sources">Sources</TabsTrigger>
				</TabsList>
				<TabsContent value="AI Assistant">
					<AIAssistantTab paper_id={paper_id}></AIAssistantTab>
				</TabsContent>
				<TabsContent value="Sources">
					<SourcesTab paper_id={paper_id}></SourcesTab>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export default ChatSourceSidebar;
