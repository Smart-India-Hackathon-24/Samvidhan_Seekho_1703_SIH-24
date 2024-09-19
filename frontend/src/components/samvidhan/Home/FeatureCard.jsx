import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

export function FeatureCard({ data }) {
	return (
		<Card className="w-[380px] cursor-pointer hover:shadow-xl h-[400px] bg-white border-0 backdrop-filter backdrop-blur-lg">
			<CardHeader>
				<CardTitle className="flex justify-center">
					<Image
						src={data?.image}
						width={300}
						height={300}
						quality={100}
						alt="demo"
						className="h-[30vh] w-full rounded-lg object-cover"
					/>
				</CardTitle>
				{/* <CardDescription>{data?.title}</CardDescription> */}
			</CardHeader>
			<CardContent>
				<div className="flex gap-1 flex-col">
					<h1 className="text-2xl font-semibold">{data?.title}</h1>
					<p className="text-wrap text-sm text-gray-500">
						{data?.description}
					</p>
				</div>
			</CardContent>
			{/* <CardFooter className="flex justify-between">

      </CardFooter> */}
		</Card>
	);
}
