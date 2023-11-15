"use client";
import useSWR from "swr";

import { Chart } from "@/app/Components/chart";
import { SvgSpinnersPulse } from "@/app/Components/icons";
import { useState } from "react";
import { Prediction } from "@/app/Components/prediction";

export default function App() {
  const [health, setHealth] = useState(true);

  return (
    <div>
      <div className="fixed right-0 top-40">
        {/* <button
          onClick={() => {
            setHealth(!health);
          }}
          className=" bg-red-300 h-12 rounded-l-2xl flex items-center p-3 hover:bg-red-500"
        >
          Toggle Health
        </button> */}
      </div>
      {/* REMOVE THISS */}

      <Chart />

      <Prediction health={health} />
    </div>
  );
}

