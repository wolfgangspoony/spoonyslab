import Link from "next/link";
import styles from "./Pagination.module.scss";

export default function Pagination({
	pageCount,
	currentPage,
	position,
}: {
	pageCount: number;
	currentPage: number;
	position: "top" | "bottom";
}) {
	if (pageCount <= 1) {
		return null;
	}

	return (
		<div
			className={`${styles["pagination"]}  ${
				styles[`pagination--${position}`]
			}`}
		>
			{Array.from({ length: pageCount }, (_, i) => (
				<Link
					className={`${styles["pagination__link"]} ${
						currentPage == i + 1
							? styles["pagination__link--active"]
							: ""
					}`}
					href={`/songs/page/${i + 1}`}
					key={i}
				>
					{i + 1}
				</Link>
			))}
		</div>
	);
}
