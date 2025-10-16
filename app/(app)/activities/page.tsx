import Link from "next/link";
import { Activities } from "@/components/activities";

export default async function Page() {
	return (
		<>
			<h1>Activities</h1>

			<Link href="/activities/getAll">Get All Activities API</Link>

			<Activities />
		</>
	);
}
