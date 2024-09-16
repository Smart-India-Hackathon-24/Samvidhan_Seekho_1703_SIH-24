import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

export function FeatureCard({data}) {
  return (
    <Card className="w-[420px] cursor-pointer hover:shadow-xl bg-gray-100">
      <CardHeader>
        <CardTitle>
        <img src={data?.image} alt="demo" className="h-[30vh] w-100 rounded-lg" />
            </CardTitle>
        {/* <CardDescription>{data?.title}</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 flex-col">
            <h1 className="text-2xl">
            {data?.title}
            </h1>
            <p className="truncate ">
        {data?.description}
            </p>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-between">

      </CardFooter> */}
    </Card>
  )
}
