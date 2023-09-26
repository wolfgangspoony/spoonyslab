import Layout from "@/components/layouts/Layout/Layout";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import NextNProgress from "nextjs-progressbar";
import { DefaultSeo } from "next-seo";
import { GoogleAnalytics } from "nextjs-google-analytics";

const roboto = Roboto({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>{`
				html {
					font-family: ${roboto.style.fontFamily}, sans-serif;
				}
			`}</style>

			<DefaultSeo
				openGraph={{
					type: "website",
					locale: "en_IE",
					url: "https://google.com",
					siteName: "Spoony's Lab",
				}}
				titleTemplate={"%s | Spoony's Lab"}
				defaultTitle={"Spoony's Lab"}
				description={"Spoony's Lab"}
			/>

			<NextNProgress color="#ff9f6a" />

			<GoogleAnalytics trackPageViews />

			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
