import { setTimeout as sleep } from "node:timers/promises";
import { seconds, throttledQueue } from "throttled-queue";

export const throttle = throttledQueue({
	maxPerInterval: 1,
	interval: seconds(1),
}); // at most make 1 request every second.

export const GET = async () => {
	const baseUrl = "https://punkapi.online/v3/";

	let page_number = 1;
	const per_page = 30;
	let continueFetching = true;

	const stream = new ReadableStream({
		start(controller) {
			const getBeers = async () => {
				const allBeers = [];

				while (continueFetching) {
					await throttle(async () => {
						const res = await fetch(`${baseUrl}beers?page=${page_number}`);
						const beers = await res.json();

						continueFetching = beers.length === per_page;
						allBeers.push([
							...beers.map((beer) => ({ id: beer.id, name: beer.name })),
						]);

						controller.enqueue(
							JSON.stringify({
								page_number,
								status: "loading",
							}),
						);

						page_number++;

						console.log(page_number, beers.length);

						// Do I need this line??
						return Promise.resolve(beers);

						// return beers;
					});
				}

				await sleep(1);
				controller.enqueue(
					JSON.stringify({
						page_number: page_number - 1,
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
