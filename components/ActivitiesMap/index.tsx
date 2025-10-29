"use client";
import { useQuery } from "@rocicorp/zero/react";
import Leaflet from "leaflet";
import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { Marker } from "react-leaflet/Marker";
import { useZero } from "@/components/zero";

import "leaflet/dist/leaflet.css";
const position: [number, number] = [48.864716, 2.349014];

const ActivitiesMap = () => {
	const z = useZero();
	const [activities] = useQuery(z.query.activities);

	// AHTODO: There must be a better way of doing this as it smells!
	useEffect(() => {
		(async function init() {
			delete Leaflet.Icon.Default.prototype._getIconUrl;
			Leaflet.Icon.Default.mergeOptions({
				iconRetinaUrl: "/leaflet/marker-icon-2x.png",
				iconUrl: "/leaflet/marker-icon.png",
				shadowUrl: "/leaflet/marker-shadow.png",
			});
		})();
	}, []);

	const markers = useMemo(() => {
		if (activities.length === 0) {
			return null;
		}

		const coords = activities
			.map((activity, index) => {
				const coords = activity.startCoords
					.replace("(", "")
					.replace(")", "")
					.split(",");

				return [...coords];
			})
			.filter((arr) => {
				console.log(arr);
				return arr[0] !== "undefined" || arr[1] !== "undefined";
			})
			.map((coords, index) => <Marker key={index} position={coords} />);

		console.log({ coords });
		return coords;
		//
		// 	return <Marker key={index} position={coords} />;
		// });
	}, [activities]);

	return (
		<MapContainer center={position} zoom={6} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{markers}
		</MapContainer>
	);
};

export default ActivitiesMap;
