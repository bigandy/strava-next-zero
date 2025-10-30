"use client";
import { decode } from "@mapbox/polyline";
import {
	MapContainer,
	Polygon,
	// Polyline,
	TileLayer,
} from "react-leaflet";

const limeOptions = { color: "#fc4c02" };

interface Props {
	polyline: string;
	coords: string;
}
export const SingleActivitiesMap = ({ polyline, coords }: Props) => {
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
