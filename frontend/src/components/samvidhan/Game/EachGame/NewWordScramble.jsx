"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, HelpCircle } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const words = {
	easy: ["REACT", "NEXT", "NODE", "JAVA", "PYTHON", "SWIFT"],
	medium: [
		"JAVASCRIPT",
		"TYPESCRIPT",
		"ANGULAR",
		"FLUTTER",
		"KOTLIN",
		"DOCKER",
	],
	hard: [
		"KUBERNETES",
		"MICROSERVICES",
		"BLOCKCHAIN",
		"SERVERLESS",
		"GRAPHQL",
		"TENSORFLOW",
	],
};

const shuffleWord = (word) => {
	const shuffled = word
		.split("")
		.sort(() => Math.random() - 0.5)
		.join("");
	return shuffled === word ? shuffleWord(word) : shuffled;
};

export default function WordScrambleGame() {
	const [difficulty, setDifficulty] = useState("easy");
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [scrambledWord, setScrambledWord] = useState("");
	const [userGuess, setUserGuess] = useState([]);
	const [score, setScore] = useState(0);
	const [feedback, setFeedback] = useState("");
	const [gameOver, setGameOver] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const [revealed, setRevealed] = useState(false);
	const inputRefs = useRef([]);

	useEffect(() => {
		if (gameStarted) {
			startNewGame();
		}
	}, [gameStarted, difficulty]);

	const startNewGame = () => {
		setCurrentWordIndex(0);
		setScore(0);
		setGameOver(false);
		nextWord();
	};

	const nextWord = () => {
		if (currentWordIndex < words[difficulty].length) {
			const word = words[difficulty][currentWordIndex];
			setScrambledWord(shuffleWord(word));
			setUserGuess(Array(word.length).fill(""));
			setFeedback("");
			setRevealed(false);
		} else {
			setGameOver(true);
		}
	};

	const handleGuess = () => {
		const currentWord = words[difficulty][currentWordIndex];
		const guessedWord = userGuess.join("");
		if (guessedWord.toUpperCase() === currentWord) {
			setScore(score + 10);
			setFeedback("Correct! +10 points");
			setTimeout(() => {
				setCurrentWordIndex(currentWordIndex + 1);
				nextWord();
			}, 1500);
		} else {
			setScore(score - 5);
			setFeedback("Incorrect! -5 points");
		}
	};

	const handleReveal = () => {
		const currentWord = words[difficulty][currentWordIndex];
		setUserGuess(currentWord.split(""));
		setScore(score - 2);
		setFeedback("Word revealed! -2 points");
		setRevealed(true);
	};

	const handleSkip = () => {
		setCurrentWordIndex(currentWordIndex + 1);
		nextWord();
	};

	const handleInputChange = (index, value) => {
		if (revealed) return;
		const newGuess = [...userGuess];
		newGuess[index] = value.toUpperCase();
		setUserGuess(newGuess);

		if (value && index < userGuess.length - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !userGuess[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		} else if (e.key === "Enter") {
			handleGuess();
		}
	};

	return (
		<div className="p-4 w-full h-full flex justify-center items-center">
			<Card className="relative overflow-hidden mt-10 pt-7">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						Word Scramble Game
					</CardTitle>
					<CardDescription className="text-center">
						Unscramble the words and earn points!
					</CardDescription>
					{gameStarted && (
						<div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full shadow-md">
							Score: {score}
						</div>
					)}
				</CardHeader>
				<CardContent>
					{!gameStarted ? (
						<>
							<div className="mb-4">
								<Label htmlFor="difficulty">Select Difficulty:</Label>
								<Select
									value={difficulty}
									onValueChange={(value) => setDifficulty(value)}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select difficulty" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="easy">Easy</SelectItem>
										<SelectItem value="medium">Medium</SelectItem>
										<SelectItem value="hard">Hard</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button onClick={() => setGameStarted(true)} className="w-full">
								Start Game
							</Button>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline" className="w-full mt-2">
										<HelpCircle className="mr-2 h-4 w-4" />
										How to Play
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>How to Play</DialogTitle>
										<DialogDescription>
											<ul className="list-disc pl-4 space-y-2">
												<li>
													Unscramble the given word by typing one letter in each
													box.
												</li>
												<li>
													Press "Enter" or click "Submit Guess" to check your
													answer.
												</li>
												<li>Correct guesses earn 10 points.</li>
												<li>Incorrect guesses lose 5 points.</li>
												<li>
													Use "Reveal Answer" if you're stuck, but lose 2
													points.
												</li>
												<li>
													"Skip" to move to the next word without penalty.
												</li>
												<li>
													Try to unscramble all words with the highest score!
												</li>
											</ul>
										</DialogDescription>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						</>
					) : !gameOver ? (
						<>
							<div className="text-center mb-4">
								<p className="text-3xl font-bold mb-2">{scrambledWord}</p>
								<p className="text-sm text-muted-foreground">
									Unscramble the word above
								</p>
							</div>
							<div className="flex justify-center space-x-2 mb-4">
								{userGuess.map((letter, index) => (
									<Input
										key={index}
										type="text"
										maxLength={1}
										value={letter}
										onChange={(e) => handleInputChange(index, e.target.value)}
										onKeyDown={(e) => handleKeyDown(index, e)}
										ref={(el) => (inputRefs.current[index] = el)}
										className="w-10 h-10 text-center"
										disabled={revealed}
									/>
								))}
							</div>
							<div className="flex justify-between mb-4 space-x-2">
								<Button
									onClick={handleGuess}
									disabled={revealed}
									className="flex-1"
								>
									Submit Guess
								</Button>
								<Button onClick={handleSkip} className="flex-1">
									Skip
								</Button>
								<Button
									onClick={handleReveal}
									disabled={revealed}
									className="flex-1"
								>
									Reveal Answer
								</Button>
							</div>
							{feedback && (
								<div
									className={`flex items-center justify-center ${
										feedback.includes("Correct")
											? "text-green-500"
											: "text-red-500"
									} mb-4`}
								>
									{feedback.includes("Correct") ? (
										<CheckCircle2 className="mr-2" />
									) : (
										<AlertCircle className="mr-2" />
									)}
									{feedback}
								</div>
							)}
							<div className="text-center">
								<p>
									Words Remaining: {words[difficulty].length - currentWordIndex}
								</p>
							</div>
						</>
					) : (
						<div className="text-center">
							<h2 className="text-xl font-bold mb-2">Game Over!</h2>
							<p className="mb-4">Final Score: {score}</p>
							<Button onClick={() => setGameStarted(false)}>Play Again</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
