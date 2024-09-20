import React from "react";
import "./page.css";
import { FeatureCard } from "@/components/samvidhan/Home/FeatureCard";
import data from "./data";
import Image from "next/image";

export default function page() {
	return (
		<>
			<div className={`relative`}>
				<div className="absolute top-0 left-0 p-5 flex gap-5">
					{/* <Image
						src="https://res.cloudinary.com/dzkhash8f/image/upload/v1726732762/Emblem_of_India__Gold_.svg_jgdsnc.png"
						alt=""
						width={100}
						height={100}
						quality={100}
						className="w-16 object-contain h-auto "
					/>
					<h1 className="text-5xl font-serif font-bold bg-gradient-to-r from-[#ff8811] via-[#FFFFFF] to-[#10bd00] bg-clip-text text-transparent">
						<span>Nagrik </span>
						<span>aur</span>
						<span className="block pl-40 mt-2">Samvidhan</span>
					</h1> */}
				</div>
				<Image
					src="https://res.cloudinary.com/dzkhash8f/image/upload/v1726732227/Leonardo_Phoenix_A_highly_detailed_and_realistic_photograph_of_3_qeosjw.jpg"
					alt=""
					width={1500}
					height={1200}
					quality={100}
					className="w-auto object-cover h-[100vh] "
				/>
				<div className="absolute bottom-0 left-0 right-0 flex justify-center  text-white text-center px-5 py-24 h-[80vh]">
					{/* <div className="flex flex-row gap-24 justify-evenly">
						{data?.map((e, id) => (
							<FeatureCard key={id} data={e} />
						))}
					</div> */}
				</div>
			</div>
			<div className="flex flex-row gap-24 justify-evenly">
				{data?.map((e, id) => (
					<FeatureCard key={id} data={e} />
				))}
			</div>
			<div className="bg--500 h-dvh w-dvw flex justify-center items-center">
				<h1 className="text-4xl font-bold">Main page For our web app</h1>
			</div>
		</>
	);
}
