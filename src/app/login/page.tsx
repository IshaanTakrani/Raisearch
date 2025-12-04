import { login } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: {
		default: 'Login',
		template: '%s | Raisearch',
	},
	icons: {
		icon: '/favicon.ico', // ✅ This must point to public/favicon.ico
	},
};

export default function LoginPage() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm flex flex-col gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h1 className="text-3xl font-bold">Login</h1>
					<p className="text-balance text-muted-foreground">
						Enter your email below to login to your account
					</p>
				</div>
				<Card>
					<CardContent>
						<form>
							<div className="flex flex-col gap-6">
								<div className="grid gap-3">
									<Label htmlFor="email">Email</Label>
									<Input id="email" name="email" type="email" required />
								</div>
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
									</div>
									<Input
										id="password"
										name="password"
										type="password"
										required
									/>
								</div>
								<div className="flex flex-col gap-3">
									<Button formAction={login} className="w-full">
										Login
									</Button>
								</div>
							</div>
							<div className="mt-4 text-center text-sm">
								Don't have an account?{' '}
								<a href="/signup" className="underline underline-offset-4">
									Sign up
								</a>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
