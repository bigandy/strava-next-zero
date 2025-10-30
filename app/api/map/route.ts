import { NextResponse } from "next/server";
import { db } from "@/db";

/**
 * /api/map
 * This is a test Route
 */
export const GET = async () => {
	// z.query.activities.where("startCoords", "IS NOT", null);
	const activities = await db.query.activities.findMany({ limit: 100 });

	const coords = [
		[-23.56593, -46.6348],
		[-23.5802, -46.66489],
		[-23.55798, -46.68838],
	];

	return NextResponse.json({
		message: "Map",
		activities,
		coords,
	});
};
