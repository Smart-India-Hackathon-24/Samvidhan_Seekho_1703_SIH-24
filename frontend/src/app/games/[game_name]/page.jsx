import { GameCategoriesData } from "@/components/samvidhan/Game/Constants";
import EachGamePage from "@/components/samvidhan/Game/EachGame/EachGamePage";

export async function generateMetadata({ params }) {
	return {
		title: `Game | ${params.game_name
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ")}`,
	};
}

export async function generateStaticParams() {
	return GameCategoriesData.flatMap((category) =>
		category.games.map((game) => ({
			game_name: game.name,
		}))
	);
}

export default function page({ params }) {
	const { game_name } = params;
	return (
		<div>
			<EachGamePage game_name={game_name.toLowerCase().replaceAll("-", " ")} />
		</div>
	);
}
