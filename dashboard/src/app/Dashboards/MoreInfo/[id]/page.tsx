"use client";
import { Chart } from "@/app/Components/chart";
import { ArcticonsJitsimeet } from "@/app/Components/icons";
import { Prediction } from "@/app/Components/prediction";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-black ml-4">
      {params.id}
      </h1>
      <Chart />
   
        
  
      <Prediction health={true} />
      <Link
          href={`https://meet.jit.si/${params.id}-John-0234`}
          className="mt-4 w-44 group transition border hover:border-emerald-500 hover:bg-emerald-200 flex items-center justify-between  p-2 rounded-lg ml-3"
        >
          Join Meeting <ArcticonsJitsimeet className="w-8 h-auto transition group-hover:text-emerald-800"/>
        </Link>
    </div>
  );
}
