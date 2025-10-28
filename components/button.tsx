import clsx from "clsx";
import type { JSX } from "react";

interface Props
	extends React.PropsWithChildren<JSX.IntrinsicElements["button"]> {
	className?: string;
	loading?: boolean;
	loadingText?: string;
}

export const Button = ({
	children,
	className,
	loading,
	loadingText,
	...attr
}: Props) => {
	return (
		<button
			type="button"
			className={clsx(
				`bg-red-500 p-4 rounded-sm text-white cursor-pointer disabled:bg-red-100 hover:bg-red-400 ${className}`,
				{
					"bg-red-200": loading,
				},
			)}
			{...attr}
		>
			{loading ? (loadingText ?? "loading") : children}
		</button>
	);
};
