import type L from "leaflet";

export interface Coord {
	id: string;
	position: L.LatLngExpression;
	name: string;
}
