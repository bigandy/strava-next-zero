"use client";
import P from "@mapbox/polyline";
import Leaflet from "leaflet";
import { useEffect } from "react";
import {
	MapContainer,
	Marker,
	Polyline,
	Popup,
	TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const limeOptions = { color: "red" };
export const SingleActivitiesMap = ({ polyline, coords }) => {
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

	console.log({
		example: P.decode("_p~iF~ps|U_ulLnnqC_mqNvxq`@"),
		polyline: P.decode(polyline),
		coords,
	});

	// returns an array of lat, lon pairs

	return (
		<div className="leaflet-container">
			<MapContainer
				center={JSON.parse(coords)}
				zoom={15}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<Marker key={1} position={JSON.parse(coords)}>
					{/* <Popup>
									<Link href={`/activities/${activity.id}`}>
										{activity.name}
									</Link>
								</Popup> */}
				</Marker>

				{/* {P.decode(polyline).map((coords, index) => {
					return <Marker key={index} position={coords} />;
				})} */}

				<Polyline pathOptions={limeOptions} positions={P.decode(polyline)} />
			</MapContainer>
		</div>
	);
};
