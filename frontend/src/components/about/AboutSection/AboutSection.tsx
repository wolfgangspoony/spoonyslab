import Header from "@/components/shared/Header/Header";
import styles from "./AboutSection.module.scss";
import {
	DocumentRenderer,
	DocumentRendererProps,
} from "@keystone-6/document-renderer";

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

export default function AboutSection({ content }: { content: any }) {
	return (
		<section className={styles["about"]}>
			<DocumentRenderer renderers={renderers} document={content} />
		</section>
	);
}
