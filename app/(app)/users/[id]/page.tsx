import {User} from '@/components/single-user'

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	
	return (
		<User id={id} />
	);
}
