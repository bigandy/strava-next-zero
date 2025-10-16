export const Button = ({ handleClick, children, ...rest }) => {
	return (
		<button
			type="button"
			className="bg-red-500 p-4 rounded-sm text-white disabled:bg-red-100"
			onClick={handleClick}
			{...rest}
		>
			{children}
		</button>
	);
};
