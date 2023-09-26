import Navbar from "@/components/nav/Navbar/Navbar";
import styles from "./Layout.module.scss";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: any }) {
	const router = useRouter();
	// Hide navbar if on home page
	const showNavbar = router.pathname != "/";

	return (
		<div className={styles["layout"]}>
			{showNavbar && <Navbar />}
			<main style={{ marginTop: showNavbar ? "7rem" : "0" }}>
				{children}
			</main>
			{/* <Footer /> */}
		</div>
	);
}
