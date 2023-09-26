import styles from "@/components/layouts/PageLayout/PageLayout.module.scss";
import Header from "@/components/shared/Header/Header";

export default function PageLayout({
	children,
	style,
	title,
}: {
	children: any;
	style?: any;
	title?: string;
}) {
	return (
		<div className={styles["page-layout"]} style={style}>
			{title && (
				<Header className={styles["page-layout__header"]}>
					{title}
				</Header>
			)}
			{children}
		</div>
	);
}
