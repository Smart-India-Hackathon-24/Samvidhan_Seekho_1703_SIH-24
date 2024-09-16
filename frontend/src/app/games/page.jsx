import GamesPage from "@/components/samvidhan/Game/GamesPage";
import React from "react";

export const metadata = {
	title: "Constitutional Games",
	description: "Play and learn about the Constitution of India",
};

export default function page() {
	return (
		<div>
			<GamesPage />
		</div>
	);
}
