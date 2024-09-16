import React from "react";
import './page.css'
import { FeatureCard } from "@/components/samvidhan/Home/FeatureCard";
import data from "./data";
export default function page() {

	return (
		<>
		<div className="relative">
			<img src="/supreme.jpg" alt="" 
			className="w-[100vw] h-[100vh] "
			/>
			<div className="absolute bottom-0 left-0 right-0 gradient-overlay flex justify-center  text-white text-center px-5 py-24 h-[60vh]">
				<p className="text-3xl items-center font-bold my-auto">
			Honoring the Legacy, Shaping the Future
				</p>
			</div>
			{/* <p className="absolute top-20 left-30 text-3xl">
			Honoring the Legacy, Shaping the Future
			</p> */}
			{/* <Image src="/Supreme-Court-of-India.jpg" alt="supreme court" width="1800" height="100"  /> */}
		</div>
		<div className="flex flex-row gap-8 justify-evenly my-10 py-2 ">
				{
				data?.map((e,id)=>(<FeatureCard key={id} data={e} />))
				}
		</div>
		<div className="bg--500 h-dvh w-dvw flex justify-center items-center">
			<h1 className="text-4xl font-bold">Main page For our web app</h1>
		</div>
		</>
	);
}
