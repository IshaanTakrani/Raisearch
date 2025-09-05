import { signup } from './actions';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className={'flex flex-col gap-6'}>
					<Card>
						<CardHeader>
							<CardTitle>Sign up</CardTitle>
							<CardDescription>
								Enter your email and password below to create a new account
							</CardDescription>
						</CardHeader>
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
										<Button formAction={signup} className="w-full">
											Sign Up
										</Button>
									</div>
								</div>
								<div className="mt-4 text-center text-sm">
									Already have an account?{' '}
									<a href="/login" className="underline underline-offset-4">
										Log in
									</a>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
		// <form>
		//   <label htmlFor="email">Email:</label>
		//   <input id="email" name="email" type="email" required />
		//   <label htmlFor="password">Password:</label>
		//   <input id="password" name="password" type="password" required />
		//   <button formAction={login}>Log in</button>
		//   <button formAction={signup}>Sign up</button>
		// </form>
	);
}
