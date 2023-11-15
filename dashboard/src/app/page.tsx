"use client";
import Link from "next/link";
import { SVGProps, useEffect } from "react";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function IcOutlineOpenInNew(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3h-7z"
      ></path>
    </svg>
  );
}

export default function Home() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    id: "",
    password: "",
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const userType:any={
    'John':'Doctor',
    'Jacob':'Patient',
    'James':'Staff'
  }
 const userTypesAllowed=[
'Doctor','Patient','Staff'
  ]
  const handleFormSubmit = async (e:any) => {
    e.preventDefault();
    try {
      localStorage.setItem('user',credentials.id)
      localStorage.setItem('userType',String(userType[credentials.id]))
      localStorage.setItem('LoggedIn','true')
      if(userTypesAllowed.includes(String(localStorage.getItem('userType')))){
        router.push(`/Dashboards/${localStorage.getItem('userType')}`)

      }
    } catch (error) {
      console.error("Error sending API request:", error);
    }
  };

  useEffect(()=>{
    // console.log(localStorage.getItem('LoggedIn'))
    if(localStorage.getItem('LoggedIn')=='true'){
      if(userTypesAllowed.includes(String(localStorage.getItem('userType')))){
      router.push(`/Dashboards/${localStorage.getItem('userType')}`)}
    }
  })

  return (
    <main className="flex items-center justify-center h-screen bg-white">
      <div className="bg-blue-400/60 border-blue-500 border w-72 rounded-2xl p-5 flex flex-col items-center -mt-16">
        <h1 className="text-3xl font-black p-4">Login</h1>
        <form
          className="mt-3 w-64 flex flex-col items-center gap-1.5"
          onSubmit={handleFormSubmit}
        >
          <input
            className="w-full h-8 indent-3 rounded-xl"
            placeholder="ID"
            type="text"
            name="id"
            value={credentials.id}
            onChange={handleInputChange}
          />
          <input
            className="w-full h-8 indent-3 rounded-xl"
            placeholder="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
          <button
            className="p-2 mt-3 block transition bg-blue-500/70 border-blue-500/20 border hover:bg-blue-600 hover:border-blue-700/70 w-64 rounded-xl font-bold text-black"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      
    </main>
  );
}


function TempNav(){
  return <div className="fixed bottom-0 bg-zinc-300 p-4  w-80 rounded-t-2xl">
  Temporary Navigation{" "}
  <span className="italic text-gray-800/70 text-sm">
    (Will Be Changed once Backend Integrated)
  </span>
  <div className="flex flex-col mt-4">
    <Link
      href={"/Dashboards/Doctor"}
      className="underline text-blue-500 flex gap-1 items-center hover:text-blue-700"
    >
      Doctor Page <IcOutlineOpenInNew />
    </Link>
    <Link
      href={"/Dashboards/Staff"}
      className="underline text-blue-500 flex gap-1 items-center hover:text-blue-700"
    >
      Staff Page <IcOutlineOpenInNew />
    </Link>
    <Link
      href={"/Dashboards/Patient"}
      className="underline text-blue-500 flex gap-1 items-center hover:text-blue-700"
    >
      Patient Page <IcOutlineOpenInNew />
    </Link>
  </div>
</div>
}