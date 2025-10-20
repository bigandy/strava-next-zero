// File: /app/page.js
"use client";

import { useState } from "react";

export default function Home() {
	const [log, setLogs] = useState<Array<string>>([""]);
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(0);

	const handleClick = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch("/api/streaming-trial");
			const reader = response.body?.getReader();
			const decoder = new TextDecoder();
			const done = false;
			while (!done) {
				const result = await reader?.read();
				if (result?.done) {
					break;
				}
				const text = decoder.decode(result?.value, { stream: true });
				const json = JSON.parse(text);
				console.log({ json });

				setLogs((prev) => [...prev, json.count]);
				setCount(json.count);
			}
			setLogs((prev) => [...prev, "Done ✅"]);
		} catch (error) {
			setLogs((prev) => [...prev, "An error occurred ❌"]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main>
			<h1>Next.js Streaming Example</h1>
			<div>{count}</div>
			<div>
				{log.length && (
					<button onClick={handleClick} disabled={loading} type="button">
						{loading ? "Loading..." : "Click Me!"}
					</button>
				)}
			</div>
			{/* <div>{log && log.map((l, i) => <p key={`log-${i}`}>{l}</p>)}</div> */}

			{log.length > 1 && !loading && (
				<div>
					<button onClick={() => setLogs([])} type="button">
						Clear logs
					</button>
				</div>
			)}
		</main>
	);
}
