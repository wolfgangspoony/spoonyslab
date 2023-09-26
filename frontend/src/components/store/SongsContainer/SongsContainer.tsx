import { ApiSong } from "@/lib/types";
import SongCard from "@/components/store/SongCard/SongCard";
import styles from "./SongsContainer.module.scss";

export default function SongsContainer({ songs }: { songs: ApiSong[] }) {
	return (
		<>
			<div className={styles["container"]}>
				{songs.map((song) => (
					<SongCard key={song.title} data={song} />
				))}
			</div>
		</>
	);
}
