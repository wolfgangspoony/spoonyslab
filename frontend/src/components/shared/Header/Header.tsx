import styles from "./Header.module.scss";

export default function Header({
	type = "h1",
	extraProps = {},
	className = "",
	children,
}: {
	type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	extraProps?: any;
	className?: string;
	children: any;
}) {
	const props = {
		className: `${styles["header"]} ${className} ${
			styles["header-" + type]
		}`,
	};

	switch (type) {
		case "h1":
			return (
				<h1 {...props} {...extraProps}>
					{children}
				</h1>
			);
		case "h2":
			return (
				<h2 {...props} {...extraProps}>
					{children}
				</h2>
			);
		case "h3":
			return (
				<h3 {...props} {...extraProps}>
					{children}
				</h3>
			);
		case "h4":
			return (
				<h4 {...props} {...extraProps}>
					{children}
				</h4>
			);
		case "h5":
			return (
				<h5 {...props} {...extraProps}>
					{children}
				</h5>
			);
		case "h6":
			return (
				<h6 {...props} {...extraProps}>
					{children}
				</h6>
			);
		default:
			return (
				<h1 {...props} {...extraProps}>
					{children}
				</h1>
			);
	}
}
