import { SingleActivity } from "@/components/single-activity";

export default async function Page({ params }) {
	// const z = useZero();
	// const [loading, setLoading] = useState(false);

	const { id } = await params;

	return <SingleActivity id={id} />;

	// const [activity] = useQuery(z.query.activities.where("id", id).one());

	// const syncActivity = async () => {
	// 	setLoading(true);

	// 	await fetch(`/activities/syncOne?id=${id}`);

	// 	setLoading(false);
	// };

	// // activities/syncOne?id=16146508452

	// if (!activity) {
	// 	return null;
	// }

	// return (
	// 	<>
	// 		<h2>Single Activity View</h2>

	// 		<Link handleClick={() => syncActivity()}>&larr; Back to Table</Link>

	// 		<Button disabled={loading} handleClick={() => syncActivity()}>
	// 			Sync Activity
	// 		</Button>

	// 		<div className="activities-table">
	// 			<table className="w-full" style={{ tableLayout: "fixed" }}>
	// 				<thead>
	// 					<tr>
	// 						<th>Name</th>
	// 						<th>Distance</th>
	// 						<th>Kudos</th>
	// 						<th>Start</th>
	// 						<th>Elevation</th>
	// 						<th>Elapsed</th>
	// 						<th>Moving</th>
	// 						<th>Type</th>
	// 						<th>Edit?</th>
	// 					</tr>
	// 				</thead>
	// 				<tbody>
	// 					<ActivityRow activity={activity} />
	// 				</tbody>
	// 			</table>
	// 		</div>
	// 		{/* <Activities /> */}
	// 	</>
	// );
}
