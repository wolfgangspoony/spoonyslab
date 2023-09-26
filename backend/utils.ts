import { text, timestamp } from "@keystone-6/core/fields";
import { Session } from "./types";

// Helper function that limits an operation to admin users only
export const isAdmin = ({ session }: { session?: Session }): boolean => {
	if (!session || !session.data) {
		return false;
	}

	return session.data.isAdmin;
};

export const slugResolveInputHook = async ({
	resolvedData,
}: {
	resolvedData: any;
}) => {
	if (resolvedData.name) {
		return resolvedData.name
			.toLowerCase()
			.replace(/\s+/g, "-") // Replace spaces with -
			.replace(/\-\-+/g, "-") // Replace multiple - with single -
			.replace(/^-+/, "") // Trim - from start of text
			.replace(/-+$/, ""); // Trim - from end of text
	}
};

export const slugField = text({
	isIndexed: true,
	ui: {
		itemView: {
			fieldMode: "hidden",
		},
		createView: {
			fieldMode: "hidden",
		},
	},
	hooks: {
		resolveInput: slugResolveInputHook,
	},
});

export const createdAtNowField = timestamp({
	defaultValue: "1970-01-01T00:00:00.000Z",
	ui: {
		itemView: {
			fieldMode: "hidden",
		},
		createView: {
			fieldMode: "hidden",
		},
	},
	hooks: {
		resolveInput: async () => {
			return new Date();
		},
	},
});
