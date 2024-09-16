"use client";
import Crossword from "@jaredreisinger/react-crossword";
import React, { useRef } from "react";

export default function CrossWordGame() {
	const crosswordRef = useRef(null);

	const data = {
		across: {
			1: {
				clue: "one plus one",
				answer: "TWO",
				row: 0,
				col: 0,
			},
			2: {
				clue: "one plus one",
				answer: "TWO",
				row: 1,
				col: 0,
			},
			3: {
				clue: "one plus one",
				answer: "TWO",
				row: 2,
				col: 0,
			},
		},
		down: {
			4: {
				clue: "three minus two",
				answer: "ONE",
				row: 0,
				col: 2,
			},
			5: {
				clue: "three minus two",
				answer: "ONE",
				row: 2,
				col: 5,
			},
			6: {
				clue: "three minus two",
				answer: "ONE",
				row: 2,
				col: 2,
			},
		},
	};

	// Custom theme for the crossword
	const theme = {
		gridBackground: "#f0f0f0", // Light gray background
		cellBackground: "#ffffff", // White cell background
		cellBorder: "#000000", // Black cell border
		textColor: "#000000", // Black text color
		numberColor: "#666666", // Dark gray number color
		focusBackground: "#e0e0e0", // Slightly darker gray for focused cells
		highlightBackground: "#d0d0d0", // Even darker gray for highlighted cells
	};

	return (
		<div className="flex flex-row justify-between p-8">
			<div className="w-1/2">
				{/* Crossword component with custom styling */}
				<Crossword
					data={data}
					ref={crosswordRef}
					theme={theme}
					acrossLabel="Across"
					downLabel="Down"
					className="rounded-lg shadow-lg"
					useStorage={false} // Set to true if you want to save progress
					onCorrect={(direction, number, answer) => {
						console.log(`Correct! ${direction} ${number} ${answer}`);
						// Add custom logic for correct answers
					}}
					onCrosswordCorrect={(isCrosswordCorrect) => {
						if (isCrosswordCorrect) {
							console.log("Congratulations! You've completed the crossword!");
							// Add logic for crossword completion
						}
					}}
				/>
			</div>
			<div className="w-1/2 pl-8">
				{/* Clues section */}
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-2xl font-bold mb-4">Clues</h2>
					<div className="mb-6">
						<h3 className="text-xl font-semibold mb-2">Across</h3>
						<ul className="list-disc pl-5">
							{Object.entries(data.across).map(([number, clue]) => (
								<li key={number} className="mb-2">
									<span className="font-bold">{number}.</span> {clue.clue}
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className="text-xl font-semibold mb-2">Down</h3>
						<ul className="list-disc pl-5">
							{Object.entries(data.down).map(([number, clue]) => (
								<li key={number} className="mb-2">
									<span className="font-bold">{number}.</span> {clue.clue}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

// Comments for customization:
// 1. Theme: Adjust colors in the 'theme' object to match your app's color scheme.
// 2. Layout: Modify the flex layout and widths to adjust the positioning of the crossword and clues.
// 3. Styling: Add or modify className properties to change the appearance of components.
// 4. Functionality: Implement custom logic in the onCorrect and onCrosswordCorrect callbacks.
// 5. Storage: Set useStorage to true and provide a storageKey if you want to save progress.
// 6. Accessibility: Customize acrossLabel and downLabel for better accessibility.
// 7. Responsiveness: Add media queries or use responsive utility classes for different screen sizes.
