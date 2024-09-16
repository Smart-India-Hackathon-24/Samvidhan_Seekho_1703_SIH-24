import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GameCard({ game }) {
	return (
		<Link
			href={game.link}
			className="flex bg-gray-100 flex-col gap-2 p-3 rounded-lg border border-gray-300 shadow-md hover:shadow-xl transition-all duration-200 w-1/4"
		>
			<div className="overflow-hidden">
				<Image
					src={game.image}
					alt={game.name}
					width={300}
					height={300}
					quality={100}
					className="w-full h-full object-contain rounded-lg"
				/>
			</div>
			<div>
				<h3 className="text-lg font-semibold">{game.name}</h3>
				<p className="text-sm text-gray-500">{game.description}</p>
			</div>
		</Link>
	);
}
