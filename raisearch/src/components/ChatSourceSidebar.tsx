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
		<div className="flex w-full justify-center">
			<div className="flex flex-col items-center gap-6 w-full ">
				<Tabs defaultValue="AI Assistant" className="w-full">
					{/* Make tabs full width */}
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="AI Assistant" className="w-full">
							AI Assistant
						</TabsTrigger>
						<TabsTrigger value="Sources" className="w-full">
							Sources
						</TabsTrigger>
					</TabsList>

					<TabsContent value="AI Assistant" className="flex justify-center">
						<AIAssistantTab paper_id={paper_id} />
					</TabsContent>
					<TabsContent value="Sources" className="flex justify-center">
						<SourcesTab paper_id={paper_id} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

export default ChatSourceSidebar;
