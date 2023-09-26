import styles from "./Footer.module.scss";

export default function Footer() {
	return (
		<footer className={styles["footer"]}>
			<div className={styles["footer__content"]}>
				<p>{`©${new Date().getFullYear()} Spoony's Lab`}</p>
			</div>
		</footer>
	);
}
