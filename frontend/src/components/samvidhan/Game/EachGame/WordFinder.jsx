"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const words = [
	"CONSTITUTION",
	"JUSTICE",
	"DEMOCRACY",
	"RIGHTS",
	"AMENDMENT",
	"JUDICIARY",
	"PARLIAMENT",
	"FEDERALISM",
];
const gridSize = 10;
const maxAttempts = 20;

const generateGrid = (wordsToPlace) => {
	const grid = Array(gridSize)
		.fill(null)
		.map(() => Array(gridSize).fill(""));
	const directions = [
		[0, 1],
		[1, 0],
		[1, 1],
		[-1, 1],
		[0, -1],
		[-1, 0],
		[-1, -1],
		[1, -1],
	];

	const wordPositions = {};
	const wordColors = {};

	wordsToPlace.forEach((word) => {
		let placed = false;
		let attempts = 0;
		while (!placed && attempts < 100) {
			const direction =
				directions[Math.floor(Math.random() * directions.length)];
			const start = {
				x: Math.floor(Math.random() * gridSize),
				y: Math.floor(Math.random() * gridSize),
			};

			if (canPlaceWord(grid, word, start, direction)) {
				placeWord(grid, word, start, direction);
				wordPositions[word] = { start, direction };
				wordColors[word] = getRandomColor();
				placed = true;
			}
			attempts++;
		}
	});

	// Fill remaining empty cells with random letters
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (grid[i][j] === "") {
				grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
			}
		}
	}

	return { grid, wordPositions, wordColors };
};

const canPlaceWord = (grid, word, start, direction) => {
	const [dx, dy] = direction;
	for (let i = 0; i < word.length; i++) {
		const x = start.x + i * dx;
		const y = start.y + i * dy;
		if (
			x < 0 ||
			x >= gridSize ||
			y < 0 ||
			y >= gridSize ||
			(grid[x][y] !== "" && grid[x][y] !== word[i])
		) {
			return false;
		}
	}
	return true;
};

const placeWord = (grid, word, start, direction) => {
	const [dx, dy] = direction;
	for (let i = 0; i < word.length; i++) {
		const x = start.x + i * dx;
		const y = start.y + i * dy;
		grid[x][y] = word[i];
	}
};

const getRandomColor = () => {
	const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500'];
	return colors[Math.floor(Math.random() * colors.length)];
};

export default function WordFinder() {
	const [grid, setGrid] = useState([]);
	const [wordPositions, setWordPositions] = useState({});
	const [wordColors, setWordColors] = useState({});
	const [selectedCells, setSelectedCells] = useState([]);
	const [foundWords, setFoundWords] = useState([]);
	const [isDragging, setIsDragging] = useState(false);
	const [startCell, setStartCell] = useState(null);
	const [score, setScore] = useState(0);
	const [attempts, setAttempts] = useState(maxAttempts);
	const [timer, setTimer] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [showAnswers, setShowAnswers] = useState(false);
	const gridRef = useRef(null);
	const intervalRef = useRef(null);

	const startNewGame = useCallback(() => {
		const { grid: newGrid, wordPositions: newWordPositions, wordColors: newWordColors } = generateGrid(words);
		setGrid(newGrid);
		setWordPositions(newWordPositions);
		setWordColors(newWordColors);
		setFoundWords([]);
		setScore(0);
		setAttempts(maxAttempts);
		setTimer(0);
		setGameOver(false);
		setShowAnswers(false);
	}, []);

	useEffect(() => {
		startNewGame();
	}, [startNewGame]);

	useEffect(() => {
		if (!gameOver) {
			intervalRef.current = setInterval(() => {
				setTimer((prevTimer) => prevTimer + 1);
			}, 1000);
		}
		return () => clearInterval(intervalRef.current);
	}, [gameOver]);

	const handleMouseDown = useCallback((x, y) => {
		if (!gameOver) {
			setIsDragging(true);
			setStartCell({ x, y });
			setSelectedCells([{ x, y }]);
		}
	}, [gameOver]);

	const handleMouseEnter = useCallback((x, y) => {
		if (isDragging && startCell && !gameOver) {
			const dx = Math.sign(x - startCell.x);
			const dy = Math.sign(y - startCell.y);
			const newSelectedCells = [];

			let cx = startCell.x;
			let cy = startCell.y;

			while (cx !== x || cy !== y) {
				newSelectedCells.push({ x: cx, y: cy });
				cx += dx;
				cy += dy;
			}
			newSelectedCells.push({ x, y });

			setSelectedCells(newSelectedCells);
		}
	}, [isDragging, startCell, gameOver]);

	const handleMouseUp = useCallback(() => {
		if (!gameOver) {
			setIsDragging(false);
			const selectedWord = selectedCells
				.map((cell) => grid[cell.x][cell.y])
				.join("");
			if (
				words.includes(selectedWord) &&
				!foundWords.includes(selectedWord)
			) {
				setFoundWords((prev) => [...prev, selectedWord]);
				setScore((prevScore) => prevScore + selectedWord.length * 10);
			} else {
				setAttempts((prevAttempts) => prevAttempts - 1);
			}
			setSelectedCells([]);

			if (
				foundWords.length + 1 === words.length ||
				attempts === 1
			) {
				setGameOver(true);
			}
		}
	}, [gameOver, selectedCells, grid, foundWords, attempts]);

	useEffect(() => {
		const handleMouseUpOutside = () => {
			if (isDragging) {
				setIsDragging(false);
				setSelectedCells([]);
			}
		};

		document.addEventListener("mouseup", handleMouseUpOutside);
		return () => {
			document.removeEventListener("mouseup", handleMouseUpOutside);
		};
	}, [isDragging]);

	function toggleShowAnswers() {
		setShowAnswers(!showAnswers);
	}

	const getCellClassName = useCallback((x, y, cell) => {
		if (showAnswers) {
			for (const [word, position] of Object.entries(wordPositions)) {
				const { start, direction } = position;
				const [dx, dy] = direction;
				for (let i = 0; i < word.length; i++) {
					if (start.x + i * dx === x && start.y + i * dy === y) {
						return `${wordColors[word]} text-white`;
					}
				}
			}
		}

		if (selectedCells.some(selectedCell => selectedCell.x === x && selectedCell.y === y)) {
			return "bg-blue-500 text-white";
		}

		for (const word of foundWords) {
			const { start, direction } = wordPositions[word];
			const [dx, dy] = direction;
			for (let i = 0; i < word.length; i++) {
				if (start.x + i * dx === x && start.y + i * dy === y) {
					return `${wordColors[word]} text-white`;
				}
			}
		}

		return "bg-gray-200";
	}, [showAnswers, wordPositions, selectedCells, foundWords, wordColors]);

	return (
		<div className="w-full p-10 flex justify-between gap-10 mb-20">
			<div className="mb-4">
				<h2 className="text-xl font-bold mb-2">Words to Find:</h2>
				<ul className="list-disc pl-5">
					{words.map((word) => (
						<li
							key={word}
							className={
								foundWords.includes(word) ? "line-through text-gray-500" : ""
							}
						>
							{word}
						</li>
					))}
				</ul>
			</div>
			<div>
				<h1 className="text-2xl font-bold mb-4">Word Finding Game</h1>
				<div className="flex justify-between mb-4">
					<div>
						<p>Score: {score}</p>
						<p>Attempts left: {attempts}</p>
						<p>
							Time: {Math.floor(timer / 60)}:
							{(timer % 60).toString().padStart(2, "0")}
						</p>
					</div>
				</div>
				<Card className="p-4 mb-4">
					<div
						className="w-[60vw] space-y-5 mb-4 select-none"
						ref={gridRef}
						onMouseLeave={() => setIsDragging(false)}
					>
						{grid.map((row, x) => (
							<div key={x} className="flex gap-5">
								{row.map((cell, y) => (
									<div
										key={`${x}-${y}`}
										className={`w-12 h-12 flex items-center justify-center text-sm font-bold rounded cursor-pointer ${getCellClassName(x, y, cell)}`}
										onMouseDown={() => handleMouseDown(x, y)}
										onMouseEnter={() => handleMouseEnter(x, y)}
										onMouseUp={handleMouseUp}
									>
										{cell}
									</div>
								))}
							</div>
						))}
					</div>
				</Card>
				<Button onClick={toggleShowAnswers} className="mt-2 cursor-pointer">
					{showAnswers ? "Hide Answers" : "Show Answers"}
				</Button>
			</div>

			{gameOver && (
				<div className="mb-4">
					<h2 className="text-xl font-bold mb-2">Game Over!</h2>
					<p>Final Score: {score}</p>
					<p>
						Time Taken: {Math.floor(timer / 60)}:
						{(timer % 60).toString().padStart(2, "0")}
					</p>
					<Button onClick={startNewGame} className="mt-2">
						Start New Game
					</Button>
				</div>
			)}
		</div>
	);
}