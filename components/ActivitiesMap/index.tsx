"use client";

import { MapContainer, TileLayer } from "react-leaflet";

interface Props extends React.PropsWithChildren {}

const position: [number, number] = [48.864716, 2.349014];

export const ActivitiesMap = ({ children }: Props) => {
	return (
		<MapContainer
			center={position}
			zoom={5}
			className="flex-1"
			preferCanvas={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{children}
		</MapContainer>
	);
};
