import AboutSection from "@/components/about/AboutSection/AboutSection";
import ContactSection from "@/components/about/ContactSection/ContactSection";
import PageLayout from "@/components/layouts/PageLayout/PageLayout";
import getClient from "@/lib/api/client";
import { ApiAboutPage } from "@/lib/types";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";

export const getStaticProps: GetStaticProps = async (context) => {
	const result = await getClient().query({
		query: gql`
			query AboutPage {
				aboutPage {
					content {
						document
					}
				}
			}
		`,
	});

	let content = result?.data.aboutPage?.content.document;

	if (result.error || !result.data.aboutPage) {
		content = [];
	}

	return {
		props: {
			data: { content },
		},
		revalidate: 60,
	};
};

export default function Page({ data }: { data: ApiAboutPage }) {
	return (
		<PageLayout>
			<NextSeo title="About" />
			<AboutSection content={data.content} />
			<ContactSection />
		</PageLayout>
	);
}
