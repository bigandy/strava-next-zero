import { ActivitiesCalendar } from "@/components/activities-calendar";

export default async function Page() {
	return (
		<>
			<h1>Activities</h1>

			{/* <Link href="/activities/getAll">Get All Activities API</Link> */}

			<ActivitiesCalendar />
		</>
	);
}
