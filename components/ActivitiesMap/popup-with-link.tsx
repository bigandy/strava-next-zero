import Link from "next/link";
import { Popup } from "react-leaflet";

interface Props {
	id: string;
	name: string;
}

export const PopupWithLink = ({ id, name }: Props) => {
	return (
		<Popup>
			<Link href={`/activities/${id}`}>{name}</Link>
		</Popup>
	);
};
