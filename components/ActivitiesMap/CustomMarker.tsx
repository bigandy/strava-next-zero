import { CircleMarker, Marker } from "react-leaflet";
import { PopupWithLink } from "@/components/ActivitiesMap/popup-with-link";

import type { Coord } from "./types";

interface CustomMarkerProps extends Coord {
	useCircles: boolean;
}
export const CustomMarker = ({
	id,
	position,
	useCircles = false,
	name,
}: CustomMarkerProps) => {
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
		>
			<PopupWithLink name={name} id={id} />
		</Marker>
	);
};
