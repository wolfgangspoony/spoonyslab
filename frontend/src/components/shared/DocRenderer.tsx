import {
	DocumentRenderer,
	DocumentRendererProps,
} from "@keystone-6/document-renderer";

import Header from "./Header/Header";

const renderers: DocumentRendererProps["renderers"] = {
	block: {
		heading: ({ children, textAlign, level }) => {
			return (
				<Header
					type={("h" + level) as any}
					extraProps={{ style: { textAlign } }}
				>
					{children}
				</Header>
			);
		},
	},
};

// Note: https:// is required for links outside of the site to work.

// This component is used to render the content of a Keystone document field.
// (With a custom h1,h2,h3 tag renderer.)
export default function RenderDocument({ content }: { content: any }) {
	return <DocumentRenderer renderers={renderers} document={content} />;
}
