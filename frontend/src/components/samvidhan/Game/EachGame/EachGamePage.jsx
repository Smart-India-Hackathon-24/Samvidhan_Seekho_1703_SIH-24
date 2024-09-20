import React from "react";
import CrossWordGame from "./CrossWordGame";
import MatchFollowingGame from "./MatchFollowingGame";
import DragAndDropGame from "./DragAndDropGame";
import WordFinder from "./WordFinder";
import WordScramble from "./WordScramble";
import NewWordScramble from "./NewWordScramble";

export default function EachGamePage({ game_name }) {
	console.log(game_name)
	const renderGame = () => {
		switch (game_name) {
			case "cross word":
				return <CrossWordGame />;
			case "Playing With Words":
				return <PlayingWithWords />;
			case "match following":
				return <MatchFollowingGame/>;
			case "drag drop":
				return <DragAndDropGame/>;
			case "word finder":
				return <WordFinder />;
			case "word scramble":
				return <WordScramble />;
			case "new word scramble":
				return <NewWordScramble />;
			
			default:
				return <div>Game not found</div>;
		}
	};
	return <div>{renderGame()}</div>;
}
