import { signIn } from "../actions";

export default async function Page() {
	return (
		<div>
			<h1>Sign In</h1>
			<form action={signIn}>
				<input
					type="text"
					name="email"
					placeholder="Email"
					defaultValue="alice@example.com"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					defaultValue="password"
				/>
				<button type="submit">Sign In</button>
			</form>
		</div>
	);
}
