export interface ApiFile {
	id: string;
	extension: string;
	filesize: number;
	url: string;
}

export interface ApiImage {
	id: string;
	extension: string;
	filesize: number;
	height: number;
	width: number;
	url: string;
}

export interface ApiSong {
	id: string;
	title: string;
	price: number;
	createdAt: string;
	songPreview: ApiFile | null;
	thumbnail: ApiFile | null;
}

export interface ApiHomePage {
	splash: ApiImage | null;
	splashPortrait: ApiImage | null;
}

export interface ApiSongsPage {
	header: string;
	featuredHeader: string;
	featuredSongs: ApiSong[];
}

export interface ApiAboutPage {
	content: any;
}

export interface ApiStorePage {
	songs: ApiSong[];
	songsPage: ApiSongsPage | null;
	pageCount: number;
	currentPage: number;
}
