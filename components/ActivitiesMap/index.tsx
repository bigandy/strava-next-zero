import { useQuery } from "@rocicorp/zero/react";
import { useZero } from "@/components/zero";

export const ActivitiesMap = () => {
	const z = useZero();
	const [activities] = useQuery(z.query.activities);

	console.log({ activities });

	return (
		<>
			<div>Imagine a map here</div>
		</>
	);
};
