"use client";
import { Chart } from "@/app/Components/chart";
import { Prediction } from "@/app/Components/prediction";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-black ml-4">
      {params.id}
      </h1>
      <Chart />
      <Prediction health={true} />
    </div>
  );
}
