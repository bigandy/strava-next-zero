"use client";

import { useState } from "react";
import { Button } from "@/components/button";

type LoadingState = "initial" | "loading" | "done" | "success" | "error";

export default function StreamReaderV2() {
	const [count, setCount] = useState(0);
	const [beers, setBeers] = useState([]);
	const [status, setStatus] = useState<LoadingState>("initial");

	const handleClick = async () => {
		setStatus("loading");
		setCount(0);
		setBeers([]);

		try {
			const response = await fetch("/api/streaming-v2");
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

				// console.log({ json });

				setCount(json.page_number);
				if (json.beers) {
					setBeers(json.beers);
				}
			}

			setStatus("done");
		} catch (error) {
			console.error(error);
			setStatus("error");
		} finally {
			setStatus("success");
		}
	};

	return (
		<main>
			<div>Page of API: {count}</div>
			<div>
				<Button
					onClick={handleClick}
					disabled={status === "loading"}
					type="button"
				>
					{status === "loading"
						? "Loading Beers..."
						: "Get Beers from Beer API!"}
				</Button>
			</div>

			{beers.length > 0 && (
				<>
					<h2 className="font-bold mt-4">Beers from BrewDog API</h2>
					<ol className="list-decimal m-4">
						{beers.map((beer) => {
							return <li key={`beer-${beer.id}`}>{beer.name}</li>;
						})}
					</ol>
				</>
			)}
		</main>
	);
}
