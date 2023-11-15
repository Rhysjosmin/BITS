import React from "react";
import useSWR from "swr";
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
  scales:{
    x:{
      ticks: {
      callback:function(value:any){
        return ''
      }
      }
    }
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

const fetcher: any = async (
  ...args: Parameters<typeof fetch>
): Promise<any> => {
  const response = await fetch(...args);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export function Chart(params: any) {
  const { data: APIData, error } = useSWR(
    `http://127.0.0.1:5000/live_Data`,
    fetcher,
    { refreshInterval: 10 }
  );

 
  let labels =  [0,0,0,0,0,0,0]

  let data = {
    labels,
    datasets: [
      {
        label: "Heart Rate",
        data: [0,0,0,0,0,0,0],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "SpO2",
        data:  [0,0,0,0,0,0,0],
        borderColor: "#62C370",
        backgroundColor: "#62C37044",
      },
    ],
  };

  if (error)
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
  if (!APIData)
    return (
      <div
        className={
          "w-[36rem] border border-1 rounded-lg border-gray-100 hover:border-black p-2 mt-4 ml-4"
        }
      >
        <h1 className="font-bold text-xl">{params.title}</h1>
        <Line options={options} data={data} />
      </div>
    );


    labels = APIData["data"].map((item: any) => {
      return item["CurrentTime"];
    });
  
    data = {
      labels,
      datasets: [
        {
          label: "Heart Rate",
          data: APIData["data"].map((item: any) => {
            return item["HeartRate"];
          }),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "SpO2",
          data: APIData["data"].map((item: any) => {
            return item["SpO2"];
          }),
          borderColor: "#62C370",
          backgroundColor: "#62C37044",
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
