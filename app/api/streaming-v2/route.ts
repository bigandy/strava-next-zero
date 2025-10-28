import { setTimeout as sleep } from "node:timers/promises";
import { seconds, throttledQueue } from "throttled-queue";

export const throttle = throttledQueue({
	maxPerInterval: 1,
	interval: seconds(1),
}); // at most make 1 request every second.

export interface Beer {
	name: string;
	id: string;
}

export const GET = async () => {
	const baseUrl = "https://punkapi.online/v3/";

	let pageNumber = 1;
	let continueFetching = true;
	const perPage = 30;

	const stream = new ReadableStream({
		start(controller) {
			const getBeers = async () => {
				const allBeers: Array<Beer> = [];

				const maxPages = Infinity;

				while (continueFetching && pageNumber <= maxPages) {
					await throttle(async () => {
						const res = await fetch(`${baseUrl}beers?page=${pageNumber}`);
						const beers = await res.json();

						continueFetching = beers.length === perPage;

						const newBeer = beers.map((beer: Beer) => ({
							// beer.id is not unique so making my own.
							id: crypto.randomUUID(),
							name: beer.name,
						}));

						allBeers.push(newBeer);

						controller.enqueue(
							JSON.stringify({
								pageNumber,
								status: "loading",
							}),
						);

						pageNumber++;

						console.log(pageNumber, beers.length);

						// Do I need this line??
						return Promise.resolve(beers);

						// return beers;
					});
				}

				await sleep(1);
				controller.enqueue(
					JSON.stringify({
						pageNumber: pageNumber - 1,
						status: "finished",
						beers: allBeers.flat(),
					}),
				);

				controller.close();
			};

			getBeers();

			// return () => controller.close();
		},
	});

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			Connection: "keep-alive",
			"Cache-Control": "no-cache, no-transform",
		},
	});
};
