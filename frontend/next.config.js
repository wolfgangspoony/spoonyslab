/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: process.env.FILES_HOSTNAME,
				port: "",
				pathname: "/**",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/songs",
				destination: "/songs/page/1",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
