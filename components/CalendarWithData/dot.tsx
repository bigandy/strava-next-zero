import styles from "./dot.styles.module.css";

export const Dot = () => {
	return (
		<button
			type="button"
			className={`${styles.dot} ${styles.singleDot} dot`}
		></button>
	);
};
