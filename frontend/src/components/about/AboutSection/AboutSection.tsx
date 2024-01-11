import RenderDocument from "@/components/shared/DocRenderer";

import styles from "./AboutSection.module.scss";

export default function AboutSection({ content }: { content: any }) {
	return (
		<section className={styles["about"]}>
			<RenderDocument content={content} />
		</section>
	);
}
