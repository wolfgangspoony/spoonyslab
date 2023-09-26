import PageLayout from "@/components/layouts/PageLayout/PageLayout";
import getClient from "@/lib/api/client";
import { ApiStorePage } from "@/lib/types";
import { gql } from "@apollo/client";
import { NextSeo } from "next-seo";
import SongsContainer from "@/components/store/SongsContainer/SongsContainer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Pagination from "@/components/store/Pagination/Pagination";
import styles from "@/styles/Songs.module.scss";
import Featured from "@/components/store/Featured/Featured";

const perPage = 4 * 3;

async function getSongsPageData() {
	const result = await getClient().query({
		query: gql`
			query SongsPage {
				songsPage {
					header
					featuredHeader
					featuredSongs {
						id
						title
						price
						createdAt
						songPreview {
							url
						}
						thumbnail {
							url
						}
					}
				}
			}
		`,
	});

	if (result.error || !result || !result.data || !result.data.songsPage) {
		return null;
	}

	const header = result.data.songsPage.header;
	const featuredHeader = result.data.songsPage.featuredHeader;
	const featuredSongs = result.data.songsPage.featuredSongs;

	return {
		header,
		featuredHeader,
		featuredSongs,
	};
}

async function getSongs(page: number) {
	page = page > 0 ? page : 1;

	const result = await getClient().query({
		query: gql`
			query Song(
				$orderBy: [SongOrderByInput!]!
				$skip: Int!
				$take: Int!
			) {
				songs(orderBy: $orderBy, skip: $skip, take: $take) {
					id
					title
					price
					createdAt
					songPreview {
						url
					}
					thumbnail {
						url
					}
				}
				songsCount
			}
		`,
		variables: {
			orderBy: [
				{
					createdAt: "desc",
				},
			],
			skip: (page - 1) * perPage,
			take: perPage,
		},
	});

	const songs = result?.data.songs;
	const totalSongsCount = result?.data.songsCount;
	const pageCount = Math.ceil(totalSongsCount / perPage);

	return {
		songs,
		pageCount,
	};
}

async function getSongsCount() {
	const result = await getClient().query({
		query: gql`
			query Song {
				songsCount
			}
		`,
	});

	const songsCount = result?.data.songsCount;
	const pageCount = Math.ceil(songsCount / perPage);

	return {
		songsCount,
		pageCount,
	};
}

export async function getStaticProps({ params }: { params: { page: string } }) {
	const page = parseInt(params.page || "1") || 1;

	const { songs, pageCount } = await getSongs(page);

	const songsPageData = await getSongsPageData();

	return {
		props: {
			data: {
				songs,
				pageCount,
				currentPage: page,
				songsPage: songsPageData,
			},
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	const { pageCount } = await getSongsCount();

	const paths = Array.from({ length: pageCount }, (_, i) => ({
		params: { page: (i + 1).toString() },
	}));

	return {
		fallback: true,
		paths: paths,
	};
}

export default function Page({ data }: { data: ApiStorePage | undefined }) {
	const router = useRouter();

	const currentPage = data?.currentPage;

	useEffect(() => {
		if (data?.songs.length === 0 && currentPage !== 1) {
			router.push("/songs/page/1");
		}
	}, [data?.songs, currentPage, router]);

	const showFeatured = currentPage === 1;

	return (
		<PageLayout title={data?.songsPage?.header}>
			<NextSeo
				title={`Songs ${currentPage != 1 ? `Page ${currentPage}` : ""}`}
			/>
			{data && currentPage != undefined && (
				<>
					{showFeatured && (
						<Featured
							songs={data.songsPage?.featuredSongs || []}
							title={data.songsPage?.featuredHeader || ""}
						/>
					)}
					<Pagination
						pageCount={data.pageCount}
						currentPage={currentPage}
						position="top"
					/>
					<SongsContainer songs={data.songs} />
					<Pagination
						pageCount={data.pageCount}
						currentPage={currentPage}
						position="bottom"
					/>
				</>
			)}
		</PageLayout>
	);
}
