"use client";
import { decode } from "@mapbox/polyline";
import Leaflet from "leaflet";
// AHTODO: move this to the .html
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import {
	MapContainer,
	Polygon,
	// Polyline,
	TileLayer,
} from "react-leaflet";

const limeOptions = { color: "red" };

interface Props {
	polyline: string;
	coords: string;
}
export const SingleActivitiesMap = ({ polyline, coords }: Props) => {
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

	return (
		<div className="leaflet-container">
			<MapContainer
				center={JSON.parse(coords)}
				zoom={15}
				// scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{/* <Polyline pathOptions={limeOptions} positions={decode(polyline)} /> */}

				<Polygon pathOptions={limeOptions} positions={decode(polyline)} />
			</MapContainer>
		</div>
	);
};
