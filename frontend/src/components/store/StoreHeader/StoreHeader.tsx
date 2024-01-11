import Image from "next/image";

import RenderDocument from "@/components/shared/DocRenderer";

import styles from "./StoreHeader.module.scss";

export default function StoreHeader({
	profilePic,
	content,
}: {
	profilePic: string | undefined;
	content: any;
}) {
	return (
		<section className={styles["container"]}>
			{profilePic && (
				<Image
					src={profilePic}
					alt=""
					width={180}
					height={180}
					className={styles["img"]}
				/>
			)}
			<RenderDocument content={content} />
		</section>
	);
}
