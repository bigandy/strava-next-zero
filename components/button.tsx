export const Button = ({ handleClick, children, className, ...rest }) => {
	return (
		<button
			type="button"
			className={`bg-red-500 p-4 rounded-sm text-white disabled:bg-red-100 hover:bg-red-400 ${className}`}
			onClick={handleClick}
			{...rest}
		>
			{children}
		</button>
	);
};
