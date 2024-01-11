import Image from "next/image";
import Link from "next/link";

import { ApiSong } from "@/lib/types";

import styles from "./SongCard.module.scss";

// @mixin for-phone-only {
//     @media (max-width: 900px) {
//         @content;
//     }
// }

// const email = "spoonyduder@gmail.com";

export default function SongCard({ data }: { data: ApiSong }) {
	// const emailSubject = `Purchase Request for ${data.title}`;
	// const emailBody =
	// 	`Name:\nEmail:\nSong: ${data.title}\nDate posted: ${data.datePosted}`.replaceAll(
	// 		"\n",
	// 		"%0D"
	// 	);

	return (
		<div className={styles["card"]}>
			<p className={styles["card__title"]}>{data.title}</p>
			<div className={styles["card__image-container"]}>
				<Image
					src={data.thumbnail?.url || ""}
					alt={data.title}
					width={300}
					height={300}
				/>
			</div>

			{data.songPreview && (
				<audio
					className={styles["card__player"]}
					controls
					src={data.songPreview.url}
				></audio>
			)}
			<p className={styles["card__date"]}>
				Date posted: {data.datePosted}
			</p>
			{/* <Link
				className={styles["card__buy"]}
				href={`mailto:${email}?subject=${emailSubject}&body=${emailBody}`}
			>
				Purchase
			</Link> */}
		</div>
	);
}
