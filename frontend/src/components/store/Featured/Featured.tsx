import SongsContainer from "@/components/store/SongsContainer/SongsContainer";
import { ApiSong } from "@/lib/types";
import styles from "./Featured.module.scss";

export default function Featured({
	songs,
	title,
}: {
	songs: ApiSong[];
	title: string;
}) {
	if (!songs || songs.length == 0) return null;

	return (
		<div className={styles["featured"]}>
			<h2>{title}</h2>
			<SongsContainer songs={songs} />
		</div>
	);
}
