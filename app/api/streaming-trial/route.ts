export function GET() {
	const responseStream = new TransformStream();

	const writer = responseStream.writable.getWriter();

	let i = 1;
	const interval = setInterval(() => {
		writer.write(
			JSON.stringify({ message: `Hello ${i}`, status: "loading", count: i }),
		);
		i++;
		if (i === 11) {
			clearInterval(interval);
			writer.write(
				JSON.stringify({ message: `Hello ${i}`, status: "finished", count: i }),
			);
			writer.close();
		}
	}, 500);

	return new Response(responseStream.readable, {
		headers: {
			"Content-Type": "text/event-stream",
			Connection: "keep-alive",
			"Cache-Control": "no-cache, no-transform",
		},
	});
}
