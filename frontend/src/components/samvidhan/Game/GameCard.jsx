import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GameCard({ game }) {
	return (
		<Link
			href={game.link}
			className="flex flex-col gap-2 p-3 rounded-lg border border-gray-300 bg-gray-100 shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 delay-100"
		>
			<div className="overflow-hidden">
				<Image
					src={game.image}
					alt={game.name}
					width={200}
					height={200}
					quality={100}
					className="w-full h-auto object-contain rounded-lg"
				/>
			</div>
			<div className="pl-2">
				<h3 className="text-lg font-semibold">{game.name}</h3>
				<p className="text-sm text-gray-500">{game.description}</p>
			</div>
		</Link>
	);
}
