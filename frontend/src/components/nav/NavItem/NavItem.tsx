import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./NavItem.module.scss";

export default function NavItem({
	text,
	href,
}: {
	text: string;
	href: string;
}) {
	const router = useRouter();

	const secondSlashIndex = href.slice(1).indexOf("/");
	const hrefPrefix =
		secondSlashIndex != -1 ? href.slice(0, secondSlashIndex + 1) : href;

	const isActive =
		(href == "/" && router.pathname == href) ||
		router.pathname.startsWith(hrefPrefix);

	return (
		<li
			className={`${styles["nav-item"]} ${
				isActive ? styles["nav-item--active"] : ""
			}`}
		>
			<Link href={href}>{text}</Link>
		</li>
	);
}
