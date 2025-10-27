import { SingleActivity } from "@/components/single-activity";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return <SingleActivity id={id} />;
}
