"use client";

import { useState } from "react";
import type { Beer } from "@/app/api/streaming-v2/route";
import { Button } from "@/components/button";

type LoadingState = "initial" | "loading" | "done" | "success" | "error";

export default function StreamReaderV2() {
	const [pageNumber, setPageNumber] = useState(0);
	const [beers, setBeers] = useState([]);
	const [status, setStatus] = useState<LoadingState>("initial");

	const handleClick = async () => {
		setStatus("loading");
		setPageNumber(0);
		setBeers([]);

		try {
			const response = await fetch("/api/streaming-v2");
			const reader = response.body?.getReader();
			if (!reader) {
				return;
			}

			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader?.read();
				if (done) {
					break;
				}
				const text = decoder.decode(value);
				const json = JSON.parse(text);

				// console.log({ json });

				setPageNumber(json.pageNumber);
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
			<div>Page of API: {pageNumber}</div>
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
						{beers.map((beer: Beer) => {
							return <li key={`beer-${beer.id}`}>{beer.name}</li>;
						})}
					</ol>
				</>
			)}
		</main>
	);
}
