import type { JSX } from "react";

interface Props
	extends React.PropsWithChildren<JSX.IntrinsicElements["button"]> {
	className?: string;
}

export const Button = ({ children, className, ...attr }: Props) => {
	return (
		<button
			type="button"
			className={`bg-red-500 p-4 rounded-sm text-white disabled:bg-red-100 hover:bg-red-400 ${className}`}
			{...attr}
		>
			{children}
		</button>
	);
};
