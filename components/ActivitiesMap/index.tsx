"use client";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import { PopupWithLink } from "./popup-with-link";

const position: [number, number] = [48.864716, 2.349014];

export const ActivitiesMap = ({ coords }) => {
	return (
		<div className="leaflet-container">
			<MapContainer center={position} zoom={6} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{coords.length > 0
					? coords.map((activity) => (
							<Marker key={activity.id} position={activity.coords}>
								<PopupWithLink name={activity.name} id={activity.id} />
							</Marker>
						))
					: null}
			</MapContainer>
		</div>
	);
};
