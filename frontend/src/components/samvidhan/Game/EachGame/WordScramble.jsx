"use client";
import React, { useState, useEffect } from "react";

const WORDS = [
	"React",
	"Typescript",
	"NextJs",
	"NodeJs",
	"Developer",
	"Mwas",
	"State",
	"Props",
	"Components",
	"TailwindCSS",
	"vercel",
	"Redux",
	"website",
	"vscode",
	"git",
	"github",
	"code",
];

function WordScramble() {
	const [correctWord, setCorrectWord] = useState("");
	const [scrambledWord, setScrambledWord] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [isPlayOn, setIsPlayOn] = useState(false);
	const [message, setMessage] = useState("");
	const [className, setClassName] = useState("");
	const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

	const selectWord = () => {
		const radIndex = Math.floor(Math.random() * WORDS.length);
		return WORDS[radIndex];
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value.toUpperCase());
	};

	const handleClick = (e) => {
		e.preventDefault();

		if (inputValue !== "") {
			if (correctWord === inputValue) {
				setMessage("Correct Answer !");
				setClassName("bg-green-400");

				setInputValue("");
				const word = selectWord();
				setCorrectWord(word.toUpperCase());
				setScrambledWord(constructScrambledWord(word));
				setIsAnswerRevealed(false);
			} else {
				setMessage("Wrong Answer !!!");
				setClassName("bg-red-400");
			}
		} else {
			setMessage("Write a Word !!");
			setClassName("bg-yellow-400");
		}
	};

	const constructScrambledWord = (word) => {
		const shuffledArray = word.split("");
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const k = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[k]] = [
				shuffledArray[k],
				shuffledArray[i],
			];
		}
		return shuffledArray.join("");
	};

	const handleStartGame = (e) => {
		e.preventDefault();
		setIsPlayOn(true);
		setInputValue("");
		setMessage("");
		const word = selectWord();
		setCorrectWord(word.toUpperCase());
		setScrambledWord(constructScrambledWord(word));
		setIsAnswerRevealed(false);
	};

	const handleRevealAnswer = () => {
		setIsAnswerRevealed(true);
		setInputValue(correctWord);
	};

	useEffect(() => {
		let clearMessage;
		if (message) {
			clearMessage = setTimeout(() => setMessage(""), 800);
		}
		return () => {
			if (clearMessage) {
				clearTimeout(clearMessage);
			}
		};
	}, [message]);

	return (
		<form>
			<div className="flex flex-col w-screen h-screen items-center justify-center border border-gray-700 p-0 sm:p-5">
				<div className=" relative flex flex-col h-[50%] w-[100%] sm:h-[40%] sm:w-[100%] bg-gray-300 items-center justify-evenly ">
					{Boolean(message) && (
						<div className="absolute top-20 left-10 sm:top-10 sm:left-9 p-1 text-white flex items-center justify-center">
							<p className={` p-1 border-none outline-none ${className}`}>
								{message}
							</p>
						</div>
					)}
					<h1 className="w-full bg-slate-800 text-white flex items-center mt-[-65px] h-[2rem] justify-center text-lg border uppercase tracking-widest">
						Word Scramble
					</h1>

					<div className="flex flex-col items-center ">
						{isPlayOn ? (
							<>
								<div className="flex flex-col align-center justify-center items-center">
									<div className="flex flex-row">
										{correctWord.split("").map((el, i) => (
											<span
												key={`${el}_${i}`}
												className="m-1 flex bg-gray-400 w-[23px] h-[23px]  sm:w-[30px] sm:h-[30px] sm:m-3 items-center text-center justify-center"
											>
												{inputValue[i]}
											</span>
										))}
									</div>
									<p className="flex items-center text-lg uppercase mt-2">
										{scrambledWord}
									</p>
								</div>
								<div className="mb-10 mt-5">
									<input
										className="border border-gray-800 p-1 focus:outline-none"
										type="text"
										onChange={handleInputChange}
										placeholder="Guess the word"
										value={inputValue}
									/>
									<input
										className="bg-black w-20 uppercase text-white p-[3px] ml-2"
										onClick={handleClick}
										type="submit"
										value="Enter"
									/>
								</div>
								<div className="w-full flex text-center items-center justify-center text-white mb-2">
									<button
										className="w-[200px] p-[2px] uppercase bg-slate-800"
										onClick={handleRevealAnswer}
										type="button"
									>
										Reveal Answer
									</button>
								</div>
							</>
						) : (
							<div className="w-full flex text-white">
								<button
									className="w-[200px] p-[2px] uppercase bg-slate-800"
									onClick={handleStartGame}
								>
									Start Game
								</button>
							</div>
						)}

						{isPlayOn && (
							<div className="w-full flex text-center items-center justify-center text-white">
								<button
									className="w-[200px] p-[2px] uppercase bg-slate-800"
									onClick={handleStartGame}
								>
									New Game
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</form>
	);
}

export default WordScramble;
