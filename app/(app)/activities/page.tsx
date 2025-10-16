import Link from "next/link";
import { Activities } from "@/components/activities";

export default async function Page() {
	return (
		<>
			<h1>Activities</h1>

			<Link className="underline text-blue-500" href="/activities/calendar">
				Calendar
			</Link>

			<Activities />
		</>
	);
}
