"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function GameCard({ game }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			href={game.link}
			className="flex flex-col gap-2 p-3 rounded-lg border border-gray-300 bg-gray-100 shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 delay-100 h-[300px]"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="overflow-hidden relative">
				<Image
					src={game.image}
					alt={game.name}
					width={200}
					height={200}
					quality={100}
					className={`w-full h-[210px] object-cover rounded-lg transition-all duration-300 ease-in-out ${
						isHovered ? "translate-y-[-100%]" : ""
					}`}
				/>
				<Image
					src={game.hoverImage}
					alt={game.name}
					width={200}
					height={200}
					quality={100}
					className={`w-full h-[210px] object-cover rounded-lg absolute top-0 left-0 transition-all duration-300 ease-in-out ${
						isHovered ? "translate-y-0" : "translate-y-[100%]"
					}`}
				/>
			</div>
			<div className="pl-2">
				<h3 className="text-lg font-semibold">{game.name}</h3>
				<p className="text-sm text-gray-500">{game.description}</p>
			</div>
		</Link>
	);
}
