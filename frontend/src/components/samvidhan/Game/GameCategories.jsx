import React from "react";
import GameCard from "./GameCard";

export default function GameCategories({ category }) {
	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">{category.name}</h1>
				<p className="text-sm text-gray-500">{category.description}</p>
			</div>
			<div className="flex flex-wrap gap-5 w-full">
				{category.games.map((game) => (
					<GameCard key={game.name} game={game} />
				))}
			</div>
		</div>
	);
}
