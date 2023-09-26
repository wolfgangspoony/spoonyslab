// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config
import dotenv from "dotenv";
dotenv.config();

import { config } from "@keystone-6/core";

import { lists } from "./schema";

import { withAuth, session } from "./auth";
// import { StorageConfig } from "@keystone-6/core/types";

const {
	// DATABASE_URL: databaseUrl = "",
	// S3_BUCKET_NAME: bucketName = "",
	// S3_REGION: region = "",
	// S3_ACCESS_KEY_ID: accessKeyId = "",
	// S3_SECRET_ACCESS_KEY: secretAccessKey = "",
	// S3_ENDPOINT: endpoint = "",
	// S3_CDN_URL: cdnUrl = "",
	FRONTEND_URL: frontendUrl = "http://localhost:5173",
	BACKEND_BASE_URL: baseUrl = "http://localhost:3000",
} = process.env;

// ! If this app needs to scale, use this:
// const defaultStorage: StorageConfig = {
// 	kind: "s3",
// 	type: "file",
// 	bucketName,
// 	region,
// 	accessKeyId,
// 	secretAccessKey,
// 	endpoint,
// 	generateUrl: (path: string) => {
// 		const pathname = new URL(path).pathname;
// 		return `${cdnUrl}${pathname}`;
// 	},
// 	acl: "public-read",
// };

export default withAuth(
	config({
		db: {
			provider: "sqlite",
			url: "file:./db/keystone.db",
			// provider: "mysql",
			// url: databaseUrl,
			// additionalPrismaDatasourceProperties: {
			// 	relationMode: "prisma",
			// },
		},
		server: {
			cors: {
				origin: frontendUrl,
			},
		},
		lists,
		session,
		storage: {
			songs: {
				kind: "local",
				type: "file",
				generateUrl: (path) => `${baseUrl}/mixtapes${path}`,
				serverRoute: {
					path: "/mixtapes",
				},
				storagePath: "public/songs",
			},
			images: {
				kind: "local",
				type: "image",
				generateUrl: (path) => `${baseUrl}/images${path}`,
				serverRoute: {
					path: "/images",
				},
				storagePath: "public/images",
			},
			// songs: defaultStorage,
			// images: { ...defaultStorage, type: "image" },
		},
	})
);
