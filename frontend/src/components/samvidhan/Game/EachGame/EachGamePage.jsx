import React from "react";
import CrossWordGame from "./CrossWordGame";
import MatchFollowingGame from "./MatchFollowingGame";
import DragAndDropGame from "./DragAndDropGame";
import WordFinder from "./WordFinder";
import WordScrambleGame from "./WordScrambleGame";

export default function EachGamePage({ game_name }) {
	console.log(game_name);
	const renderGame = () => {
		switch (game_name) {
			case "cross word":
				return <CrossWordGame />;
			case "article match":
				return <MatchFollowingGame />;
			case "drag drop":
				return <DragAndDropGame />;
			case "word finder":
				return <WordFinder />;
			case "word scramble":
				return <WordScrambleGame />;

			default:
				return <div>Game not found</div>;
		}
	};
	return <div>{renderGame()}</div>;
}
