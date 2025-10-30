"use client";

import { useQuery } from "@rocicorp/zero/react";
import L from "leaflet";
import dynamic from "next/dynamic";
import { CircleMarker, Marker, Popup } from "react-leaflet";
import { PopupWithLink } from "@/components/ActivitiesMap/popup-with-link";
import { useZero } from "@/components/zero";

const markerIcon = L.icon({
	iconUrl: "/leaflet/marker-icon.png",
	// iconAnchor: [25, 50],
	// iconSize: [50, 50],
});

const DynamicMap = dynamic(
	() => import("../../../components/ActivitiesMap/test-map"),
	{
		loading: () => (
			<div className="h-full w-full grid place-content-center text-3xl text-black/40">
				<p>Loading...</p>
			</div>
		),
		ssr: false,
	},
);
// export default async function Page() {
// 	const res = await fetch("/api/map");
// 	const json = await res.json();

// 	console.log({ json });
// 	return <DynamicMap coords={json?.coords} />;
// }

export default function Page() {
	const z = useZero();
	// const [showMarkers, setShowMarkers] = useState(false);
	const [activities] = useQuery(
		z.query.activities.where("startCoords", "IS NOT", null),
	);

	const coords = [...activities].map(({ startCoords, id, name }) => {
		// @ts-expect-error startCoords is defined!
		const [x, y] = JSON.parse(startCoords);

		return { coords: [x, y], id, name };
	});

	// const handleLoaded = () => {
	// 	console.log("child component has loaded");
	// 	setShowMarkers(true);
	// };

	return (
		<>
			<DynamicMap>
				{coords.length > 0 &&
					coords.map((coord) => {
						return (
							<MyMarker
								position={coord.coords}
								key={coord.id}
								id={coord.id}
								name={coord.name}
								// showMarkers={showMarkers}
								showMarkers
								useCircles={true}
							/>
						);
					})}
			</DynamicMap>
		</>
	);
}

const MyMarker = ({ showMarkers, id, position, useCircles = false, name }) => {
	// if (!showMarkers) {
	// 	return null;
	// }

	if (useCircles) {
		return (
			<CircleMarker key={id} center={position} radius={5}>
				<PopupWithLink name={name} id={id} />
			</CircleMarker>
		);
	}

	return (
		<Marker
			// icon={markerIcon}
			key={id}
			position={position}
			// radius={5}
		>
			<PopupWithLink name={name} id={id} />
		</Marker>
	);
};
