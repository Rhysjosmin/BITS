"use client";
import useSWR from "swr";

import { Chart } from "@/app/Components/chart";
import { SvgSpinnersPulse } from "@/app/Components/icons";
import { useState } from "react";

export default function App() {
  const [health, setHealth] = useState(true);

  return (
    <div>
      <div className="fixed right-0 top-40">
        <button
          onClick={() => {
            setHealth(!health);
          }}
          className=" bg-red-300 h-12 rounded-l-2xl flex items-center p-3 hover:bg-red-500"
        >
          Toggle Health
        </button>
      </div>
      {/* REMOVE THISS */}

      <Chart />

      <Prediction health={health} />
    </div>
  );
}

const fetcher: any = async (
  ...args: Parameters<typeof fetch>
): Promise<any> => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
let i = 0;
const pred_ = {
  'N': "Normal beat",
  'S': "Supraventricular premature beat",
  'V': "Premature ventricular contraction",
  'F': "Fusion of ventricular and normal beat",
  'Q': "Unclassifiable beat",
  'M': "myocardial infarction",
};
function Prediction(props: any) {
  const { data: APIData, error } = useSWR(
    `https://bits-bz45.onrender.com/Predict`,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (error)
    return (
      <div className="m-3  border border-1 rounded-lg border-red-600 bg-red-500/20  p-3 flex w-96">
        <h1 className="">Failed To Load</h1>
      </div>
    );
  if (!APIData)
    return <div className="m-3  border border-1 rounded-lg border-emerald-600 bg-emerald-500/20  p-3 flex w-96">
    <h1 className="">Loading ...</h1>
  </div>;
  

 

  if (APIData['pred']['label']=='N') {
    return (
      <div className="m-3  border border-1 rounded-lg border-emerald-600 bg-emerald-500/20  p-3 flex w-96">
        <h1 className="">AI Prediction : {String(APIData['pred']['label'])}</h1>
      </div>
    );
  }
  return (
    <div className="m-3  border border-1 rounded-lg border-red-600 bg-red-500/20  p-3 relative w-96 animate-pulse  ">
      <h1 className="">AI Prediction : Abnormal Heart Rate : {String(APIData['pred']['label'])}</h1>
      <div>
        <div className="text-sm flex items-center gap-4">
          Notifying Emergency Services
          <SvgSpinnersPulse className="text-blue-600" />
        </div>

        <button className="mt-2 transition bg-red-500/50 hover:bg-red-500 p-1 px-2 rounded-lg border border-red-600">
          Cancel
        </button>
      </div>
    </div>
  );
}
