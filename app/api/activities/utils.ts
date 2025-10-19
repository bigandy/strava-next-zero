import dayjs from "dayjs";
import { getTableColumns, sql } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import type { DetailedActivityResponse } from "strava-v3";
import { default as strava } from "strava-v3";
import { seconds, throttledQueue } from "throttled-queue";
import { db } from "@/db";
import { activities } from "@/db/schema";
import type { Account } from "@/schema";

interface Activity extends DetailedActivityResponse {
	type: string;
	visibility: string;
	private_note: string;
}

const nowEpoc = () => Math.floor(Date.now()) / 1000;

const getAccessToken = async (account: Account) => {
	const now = nowEpoc();
	const expires = dayjs(account.access_token_expires).valueOf() / 1000;

	if (now > expires) {
		console.log("NEED NEW TOKEN");
		// 	strava.config({
		// 		access_token: account.access_token!,
		// 		client_id: process.env.AUTH_STRAVA_ID!,
		// 		client_secret: process.env.AUTH_STRAVA_SECRET!,
		// 		redirect_uri: process.env.AUTH_STRAVA_REDIRECT_URL!,
		// 	});
		// 	const { access_token, refresh_token, expires_at } =
		// 		await strava.oauth.refreshToken(account.refresh_token);
		// 	await db
		// 		.update(accounts)
		// 		.set({ refresh_token, access_token, expires_at })
		// 		.where(eq(accounts.userId, userId));
		// 	return access_token;
	}

	return account.access_token;
};

const getStravaClient = async (account: Account) => {
	const accessToken = await getAccessToken(account);
	if (!accessToken) {
		return null;
	}
	const client = new strava.client(accessToken);
	return client;
};

export const writeActivitiesToDB = async (stravaActivities) => {
	return await db.insert(activities).values(
		stravaActivities.map((act) => {
			return {
				id: act.id,
				name: act.name,
				description: act.description,
				kudos: act.kudos,
				start: act.start,
				elapsedTime: act.elapsedTime,
				movingTime: act.movingTime,
				type: act.type,
				elevation: act.elevation,
				distance: act.distance,
				visibility: act.visibility,
			};
		}),
	);
};

// https://github.com/drizzle-team/drizzle-orm/issues/1728#issuecomment-3249156563
const conflictUpdateAllExcept = <
	T extends PgTable,
	C extends keyof T["$inferInsert"],
>(
	table: T,
	except: C[],
) =>
	Object.fromEntries(
		Object.entries(getTableColumns(table))
			.filter(
				([colName]) =>
					!except.includes(colName as keyof typeof table.$inferInsert),
			)
			.map(([colName, { name }]) => [colName, sql.raw(`EXCLUDED."${name}"`)]),
	);

const formatStravaActivities = (activities) => {
	return activities?.map((activity: Activity) => {
		return {
			name: activity.name,
			distance: activity.distance,
			id: activity.id,
			kudos: activity.kudos_count,
			start: dayjs(activity.start_date_local),
			elevation: activity.total_elevation_gain,
			description: activity.description,
			type: activity.type,
			athletes: activity.athlete_count,
			elapsedTime: activity.elapsed_time,
			movingTime: activity.moving_time,
			visibility: activity.visibility,
			// private: activity.private_note,
		};
	});
};

export const upsertActivitiesToDB = async (stravaActivities) => {
	return await db
		.insert(activities)
		.values(
			stravaActivities.map((act) => {
				return {
					id: act.id,
					name: act.name,
					description: act.description,
					kudos: act.kudos,
					start: act.start,
					elapsedTime: act.elapsedTime,
					movingTime: act.movingTime,
					type: act.type,
					elevation: act.elevation,
					distance: act.distance,
					visibility: act.visibility,
				};
			}),
		)
		.onConflictDoUpdate({
			target: activities.id,
			set: conflictUpdateAllExcept(activities, ["id"]),
		});
};

export const deleteActivities = async () => {
	return await db.delete(activities);
};

export const getAllStravaActivities = async (account: Account) => {
	const strava = await getStravaClient(account);

	const allStravaActivities = [];
	let page = 1;
	const per_page = 100;

	let continueFetching = true;

	const throttle = throttledQueue({
		maxPerInterval: 1,
		interval: seconds(1),
	}); // at most make 1 request every second.

	while (continueFetching) {
		await throttle(async () => {
			const activities = await strava?.athlete.listActivities({
				page,
				per_page,
			});

			// format so can go into db
			const formattedActivities = formatStravaActivities(activities);

			// write to the db
			await upsertActivitiesToDB(formattedActivities);

			continueFetching = formattedActivities.length === per_page;
			allStravaActivities.push(formattedActivities);

			page++;

			console.log(page, formattedActivities.length);

			// Do I need this line??
			return Promise.resolve("hello!");
		});
	}

	// Probably best not returning the activities here;
	return "done";
};

export const getStravaActivities = async (account: Account, options = {}) => {
	const strava = await getStravaClient(account);
	const payload = await strava?.athlete.listActivities(options);
	return formatStravaActivities(payload);
};

export const getOneStravaActivity = async (
	account: Account,
	activityId: string,
) => {
	const strava = await getStravaClient(account);
	const payload = await strava?.activities.get({ id: activityId });

	return formatStravaActivities([payload]);
};
