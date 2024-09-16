import DockComponent from "@/components/samvidhan/Common/Dock/DockComponent";
import "./globals.css";

export const metadata = {
	title: "Samvidhan Sheekho",
	description: "Samvidhan Sheekho",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<div className="min-h-dvh w-dvw">
					{children}
				</div>
				<DockComponent />
			</body>
		</html>
	);
}
