"use client";
import { DashboardTable } from "@/app/Components/Table";
import { ArcticonsJitsimeet } from "@/app/Components/icons";
import { Grid } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const currentDate = "2018-11-01";
const schedulerData = [
  {
    startDate: "2018-11-01T09:45",
    endDate: "2018-11-01T11:00",
    title: "Meeting",
  },
  {
    startDate: "2018-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "Go to a gym",
  },
];

export default function Page() {
  const [meetingLink, setMeetingLink] = useState('');
  const Data: any = [
    [
      "10 Jan 23",
      "10:00 AM",
      "Paracetamol",
      "take the medication only if you have fever",
    ],
    [
      "12 Jan 23",
      "All Day",
      "Therapy",
      "Don't Forget to bring a book and a pen",
    ],
  ];
  const Headers: any = ["Date", "Time", "Event", "Notes"];

  return (
    <div>
      <DashboardTable Headers={Headers} Data={Data} />
      {meetingLink ? (
        <Link
          href={meetingLink}
          className="mt-4 w-44 group transition border hover:border-emerald-500 hover:bg-emerald-200 flex items-center justify-between  p-2 rounded-lg"
        >
          Join Meeting <ArcticonsJitsimeet className="w-8 h-auto transition group-hover:text-emerald-800"/>
        </Link>
      ) : (
        <button
          onClick={() => {setMeetingLink(`https://meet.jit.si/Jacob-John-0234`)}}
          className="mt-4 transition border hover:border-blue-500 hover:bg-blue-200 flex  p-2 rounded-lg"
        >
          Schedule A Meeting With Dr {"John"}
        </button>
      )}
    </div>
  );
}
