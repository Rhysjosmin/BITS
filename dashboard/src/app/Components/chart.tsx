import React from "react";
import useSWR from 'swr'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};




const fetcher:any = async (...args: Parameters<typeof fetch>): Promise<any> => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export function Chart(params: any) {
  const { data: APIData, error } = useSWR(
    `https://bits-bz45.onrender.com//live_Data`,
    fetcher,
    { refreshInterval: 10 }
  );


  if (error)
    return (
      <div className="bg-[#22020266] w-64 h-40 rounded-lg p-2 ">
        Failed to load
      </div>
    );
  if (!APIData)
    return <div className="w-64 h-40 bg-[#02221866] rounded-lg p-2"></div>;
  // console.log(APIData['data'])
  const labels=APIData['data']
  const data = {
    labels,
    datasets: [
      {
        label: "Heart Rate",
        data: APIData['data'],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div
      className={
        "w-[36rem] border border-1 rounded-lg border-gray-100 p-2 mt-4 ml-4"
      }
    >
      <h1 className="font-bold text-xl">{params.title}</h1>
      <Line options={options} data={data} />
    </div>
  );
}
