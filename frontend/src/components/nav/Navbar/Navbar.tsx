import NavItem from "@/components/nav/NavItem/NavItem";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

// text-shadow: #FC0 1px 0 10px;

function Letter({
	color = "#eaeaea",
	children,
}: {
	color?: string;
	children: any;
}) {
	return (
		<span
			style={{
				color,
				marginRight: "0.05rem",
				textShadow: `${color} 0px 0 9px`,
			}}
		>
			{children}
		</span>
	);
}

export default function Navbar() {
	const [minimizeNav, setMinimizeNav] = useState(false);

	useEffect(() => {
		const update = () => {
			setMinimizeNav(
				document.body.scrollTop > 50 ||
					document.documentElement.scrollTop > 50
			);
		};
		window.addEventListener("scroll", update);
		update();
		return () => window.removeEventListener("scroll", update);
	}, []);

	return (
		<header
			className={
				styles["navbar"] +
				" " +
				(minimizeNav ? styles["navbar--minimized"] : "")
			}
		>
			<Link href="/">
				<h2 className={styles["navbar__title"]}>
					<Letter color={"#681e8a"}>S</Letter>
					<Letter color={"#247dac"}>P</Letter>
					<Letter color={"#c49f1b"}>O</Letter>
					<Letter color={"#a00f2b"}>O</Letter>
					<Letter color={"#d77713"}>N</Letter>
					<Letter color={"#478b1e"}>Y</Letter>
					<Letter>{"'"}</Letter>
					<Letter color={"#c49f1a"}>S</Letter>
					<Letter> </Letter>
					<Letter>L</Letter>
					<Letter>A</Letter>
					<Letter>B</Letter>
				</h2>
			</Link>
			<nav className={styles["navbar__nav"]}>
				<ul className={styles["navbar__nav-list"]}>
					<NavItem href="/" text="Home" />
					<NavItem href="/songs" text="Songs" />
					<NavItem href="/about" text="About" />
				</ul>
			</nav>
		</header>
	);
}
