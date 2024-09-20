import React from "react";
import GameCategories from "./GameCategories";
import { GameCategoriesData } from "./Constants";

export default function GamesPage() {
	return (
		<div className="p-3 flex flex-col gap-14 mb-10">
			{GameCategoriesData.map((category) => (
				<GameCategories key={category.name} category={category} />
			))}
		</div>
	);
}
