import type { Account } from "@/schema";
import { formatStravaActivities, getStravaClient, throttle } from "./utils";

// async function* nodeStreamToIterator(stream: any) {
// 	for await (const chunk of stream) {
// 		const encoder = new TextEncoder();
// 		const responseMsg = JSON.stringify({
// 			status: "loading",
// 		});

// 		yield new encoder.encode(responseMsg);
// 	}
// }

export const getAllStravaActivitiesWithStreaming = async (
	account: Account,
	maxPages: number = Infinity,
) => {
	const strava = await getStravaClient(account);

	const allStravaActivities = [];
	let page = 1;
	const per_page = 100;

	let continueFetching = true;

	while (continueFetching && page <= maxPages) {
		const newActivities = await throttle(async () => {
			const activities = await strava?.athlete.listActivities({
				page,
				per_page,
			});

			// format so can go into db
			const formattedActivities = formatStravaActivities(activities);

			// write to the db
			// await upsertActivitiesToDB(formattedActivities);

			continueFetching = formattedActivities.length === per_page;

			page++;

			return formattedActivities;
		});

		allStravaActivities.push(newActivities);

		// const responseMsg = JSON.stringify({
		// 	status: "loading",
		// 	page: page - 1,
		// });
		// writer.write(encoder.encode(responseMsg));
	}

	// writer.write(
	// 	JSON.stringify({
	// 		status: "done",
	// 	}),
	// );
	// writer.close();

	return "done";
};
