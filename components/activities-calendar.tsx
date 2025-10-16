"use client";

import { useQuery } from "@rocicorp/zero/react";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useZero } from "@/components/zero";
import { MultipleCalendars } from "./CalendarWithData/multiple-calendars";
import { formattedGetDMY } from "./CalendarWithData/utils";

export const ActivitiesCalendar = () => {
	const z = useZero();

	const [activities] = useQuery(z.query.activities.orderBy("start", "desc"));

	const data = useMemo(() => {
		return activities.map((activity) => {
			const date = dayjs(activity.start);
			return {
				month: date.format("M"),
				year: date.format("YYYY"),
				date: formattedGetDMY(activity.start),
			};
		});
	}, [activities]);

	return <MultipleCalendars data={data} />;
};
