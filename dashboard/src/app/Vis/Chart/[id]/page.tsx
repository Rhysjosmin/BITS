"use client";
import { Chart } from "@/app/Components/chart";
import { Prediction } from "@/app/Components/prediction";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Chart title={params.id} />
      <Prediction/>
    </div>
  );
}
