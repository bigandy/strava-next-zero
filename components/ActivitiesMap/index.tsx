"use client";
import Leaflet from "leaflet";
import Link from "next/link";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// AHTODO: move this to the .html
import "leaflet/dist/leaflet.css";
const position: [number, number] = [48.864716, 2.349014];

export const ActivitiesMap = ({ coords }) => {
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
			<MapContainer center={position} zoom={6} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{coords.length > 0
					? coords.map((activity) => (
							<Marker key={activity.id} position={activity.coords}>
								<Popup>
									<Link href={`/activities/${activity.id}`}>
										{activity.name}
									</Link>
								</Popup>
							</Marker>
						))
					: null}
			</MapContainer>
		</div>
	);
};
