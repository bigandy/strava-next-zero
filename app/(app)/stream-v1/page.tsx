"use client";

import { useState } from "react";
import { Button } from "@/components/button";

type LoadingState = "initial" | "loading" | "done" | "success" | "error";

export default function StreamReaderV1() {
	const [count, setCount] = useState(0);
	const [status, setStatus] = useState<LoadingState>("initial");

	const handleClick = async (e) => {
		e.preventDefault();

		setStatus("loading");
		setCount(0);

		try {
			const response = await fetch("/api/streaming-v1");
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
				console.log({ status: json.status, count: json.count });

				setCount(json.count);
			}

			// setLogs((prev) => [...prev, "Done ✅"]);
			setStatus("done");
		} catch (error) {
			console.error(error);
			// setLogs((prev) => [...prev, "An error occurred ❌"]);
			setStatus("error");
		} finally {
			setStatus("success");
		}
	};

	return (
		<main>
			<div>{count}</div>
			<div>
				<Button
					onClick={handleClick}
					disabled={status === "loading"}
					type="button"
				>
					{status === "loading" ? "Loading..." : "Click Me!"}
				</Button>
			</div>
		</main>
	);
}
