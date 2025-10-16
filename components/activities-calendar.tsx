"use client";

import { useQuery } from "@rocicorp/zero/react";
import { useMemo } from "react";
import { useZero } from "@/components/zero";
import { MultipleCalendars } from "./CalendarWithData/multiple-calendars";
import { formattedGetDMY } from "./CalendarWithData/utils";

export const ActivitiesCalendar = () => {
	const z = useZero();

	const [activities] = useQuery(z.query.activities.orderBy("start", "desc"));

	const data = useMemo(() => {
		return activities.map((activity) => {
			return { date: formattedGetDMY(activity.start) };
		});
	}, [activities]);

	return (
		<>
			<MultipleCalendars data={data} />
		</>
	);
};
