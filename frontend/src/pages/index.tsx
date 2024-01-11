// import { GetStaticProps } from "next";

import { NextSeo } from "next-seo";

import { ApiHomePage } from "@/lib/types";

// import Image from "next/image";
// import Link from "next/link";

// import getClient from "@/lib/api/client";

// import styles from "@/styles/Home.module.scss";
// import { gql } from "@apollo/client";

// export const getStaticProps: GetStaticProps = async (context) => {
// 	const result = await getClient().query({
// 		query: gql`
// 			query HomePage {
// 				homePage {
// 					splash {
// 						url
// 						width
// 						height
// 					}
// 					splashPortrait {
// 						url
// 						width
// 						height
// 					}
// 				}
// 			}
// 		`,
// 	});
// 	return {
// 		props: {
// 			data: result?.data?.homePage || null,
// 		},
// 		revalidate: 60,
// 	};
// };

export default function Page({ data }: { data: ApiHomePage }) {
	return (
		<>
			<NextSeo />
			{/* {data.splash && data.splashPortrait && (
				<Link href="/songs">
					<div
						className={`${styles["splash-container"]} ${styles["splash-container--landscape"]}`}
					>
						<Image
							src={data.splash.url}
							alt="Splash Image"
							width={data.splash.width}
							height={data.splash.height}
						/>
					</div>
					<div
						className={`${styles["splash-container"]} ${styles["splash-container--portrait"]}`}
					>
						<Image
							src={data.splashPortrait.url}
							alt="Splash Image"
							width={data.splashPortrait.width}
							height={data.splashPortrait.height}
						/>
					</div>
				</Link>
			)} */}
		</>
	);
}
