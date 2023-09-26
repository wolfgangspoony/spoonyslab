// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";

import {
	text,
	password,
	checkbox,
	image,
	float,
	file,
	relationship,
} from "@keystone-6/core/fields";

import { document } from "@keystone-6/fields-document";

import type { Lists } from ".keystone/types";
import { createdAtNowField, isAdmin } from "./utils";

export const lists: Lists = {
	User: list({
		access: isAdmin,

		fields: {
			name: text({ validation: { isRequired: true } }),

			email: text({
				validation: { isRequired: true },
				isIndexed: "unique",
			}),

			password: password({ validation: { isRequired: true } }),

			isAdmin: checkbox(),

			createdAt: createdAtNowField as any,
		},
	}),

	Song: list({
		access: {
			operation: {
				query: allowAll,
				create: isAdmin,
				update: isAdmin,
				delete: isAdmin,
			},
		},

		ui: {
			labelField: "title",
		},

		fields: {
			// sku: text({
			// 	validation: { isRequired: true },
			// 	isIndexed: "unique",
			// }),
			title: text({ validation: { isRequired: true } }),
			price: float({ validation: { isRequired: true } }),

			thumbnail: image({ storage: "images" }),

			songPreview: file({ storage: "songs" }),

			createdAt: createdAtNowField as any,
		},
	}),

	HomePage: list({
		access: {
			operation: {
				query: allowAll,
				create: isAdmin,
				update: isAdmin,
				delete: isAdmin,
			},
		},

		isSingleton: true,

		fields: {
			splash: image({ storage: "images" }),
			splashPortrait: image({ storage: "images" }),
		},
	}),

	SongsPage: list({
		access: {
			operation: {
				query: allowAll,
				create: isAdmin,
				update: isAdmin,
				delete: isAdmin,
			},
		},

		isSingleton: true,

		fields: {
			header: text(),
			featuredHeader: text(),
			featuredSongs: relationship({
				ref: "Song",
				many: true,
			}),
		},
	}),

	AboutPage: list({
		access: {
			operation: {
				query: allowAll,
				create: isAdmin,
				update: isAdmin,
				delete: isAdmin,
			},
		},

		isSingleton: true,

		fields: {
			content: document({
				formatting: true,
				links: true,
				dividers: true,
			}),
		},
	}),
};
