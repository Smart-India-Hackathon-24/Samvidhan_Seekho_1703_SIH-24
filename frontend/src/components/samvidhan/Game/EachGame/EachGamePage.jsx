import React from "react";
import CrossWordGame from "./CrossWordGame";

export default function EachGamePage({ game_name }) {
	const renderGame = () => {
		switch (game_name) {
			case "cross word":
				return <CrossWordGame />;
			case "Playing With Words":
				return <PlayingWithWords />;
			default:
				return <div>Game not found</div>;
		}
	};
	return <div>{renderGame()}</div>;
}
