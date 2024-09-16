import React from "react";
import GameCategories from "./GameCategories";
import { GameCategoriesData } from "./Constants";

export default function GamesPage() {
	return (
		<div className="p-14">
			{GameCategoriesData.map((category) => (
				<GameCategories key={category.name} category={category} />
			))}
		</div>
	);
}
