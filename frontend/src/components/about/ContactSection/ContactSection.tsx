import Image from "next/image";
import Link from "next/link";
import Header from "@/components/shared/Header/Header";
import styles from "./ContactSection.module.scss";

import instagramLogo from "super-tiny-icons/images/svg/instagram.svg";
import emailLogo from "super-tiny-icons/images/svg/email.svg";
import twitchLogo from "super-tiny-icons/images/svg/twitch.svg";
import youtubeLogo from "super-tiny-icons/images/svg/youtube.svg";

function Social({ link, logo, alt }: { link: string; logo: any; alt: string }) {
	return (
		<Link className={styles["social"]} target="_blank" href={link}>
			<Image src={logo.src} width={52} height={52} alt={alt} />
		</Link>
	);
}

export default function ContactSection() {
	return (
		<section className={styles["contact"]}>
			<Header>Contact</Header>
			<div className={styles["socials"]}>
				<Social
					link={"https://www.instagram.com/spoonyduder "}
					logo={instagramLogo}
					alt={"Instagram"}
				/>
				<Social
					link={"mailto: spoonyduder@gmail.com"}
					logo={emailLogo}
					alt={"Email"}
				/>
				<Social
					link={"https://www.twitch.tv/spoonyduder"}
					logo={twitchLogo}
					alt={"Twitch"}
				/>
				<Social
					link={"https://www.youtube.com/@spoonyduder3872"}
					logo={youtubeLogo}
					alt={"Youtube"}
				/>
			</div>
		</section>
	);
}
