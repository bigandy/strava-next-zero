"use client";
import { useQuery } from "@rocicorp/zero/react";
import dynamic from "next/dynamic";
import { CustomMarker } from "@/components/ActivitiesMap/CustomMarker";
import type { Coord } from "@/components/ActivitiesMap/types";
import { queries } from '@/zero/queries'

const DynamicMap = dynamic(
	() =>
		import("../../../../components/ActivitiesMap").then(
			(module) => module.ActivitiesMap,
		),
	{
		loading: () => (
			<div className="leaflet-container leaflet-container--loading">
				<div>Loading...</div>
			</div>
		),
		ssr: false,
	},
);

export default function Page() {
	const [activities] = useQuery(
		queries.activities.all()
	);

	const coords = activities.map(({ startCoords, id, name }) => {
		// @ts-expect-error startCoords is definitely there!
		const [x, y] = JSON.parse(startCoords);

		return { position: [x, y], id, name } as Coord;
	});

	return (
		<DynamicMap>
			{coords.length > 0 &&
				coords.map((coord: Coord) => {
					return (
						<CustomMarker
							position={coord.position}
							key={coord.id}
							id={coord.id}
							name={coord.name}
							useCircles={true}
						/>
					);
				})}
		</DynamicMap>
	);
}
