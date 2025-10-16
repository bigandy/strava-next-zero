import styles from "./styles.module.css";

export const TableHeader = () => {
	return (
		<thead>
			<tr>
				<th>
					M<span className={styles.medium}>on</span>
					<span className={styles.long}>day</span>
				</th>
				<th>
					Tu<span className={styles.medium}>e</span>
					<span className={styles.long}>sday</span>
				</th>
				<th>
					W<span className={styles.medium}>ed</span>
					<span className={styles.long}>nesday</span>
				</th>
				<th>
					Th<span className={styles.medium}>u</span>
					<span className={styles.long}>rsday</span>
				</th>
				<th>
					F<span className={styles.medium}>ri</span>
					<span className={styles.long}>day</span>
				</th>
				<th>
					Sa<span className={styles.medium}>t</span>
					<span className={styles.long}>urday</span>
				</th>
				<th>
					Su<span className={styles.medium}>n</span>
					<span className={styles.long}>day</span>
				</th>
			</tr>
		</thead>
	);
};
