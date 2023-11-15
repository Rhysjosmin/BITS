'use client'
import { useRouter } from "next/navigation" 
import { IcBaselineOpenInNew } from "./icons"

export function DashboardTable(props:any){
  const router= useRouter()
    return <table className="mt-3">
    <tbody>
      <tr>
        {
        props.Headers.map((d:string[])=>{
          return <th className=" p-1 border" key={props.Headers.indexOf(d)}>{d}</th>
        })
        }
      </tr>
     {
      props.Data.map((d:any)=>{
        return <tr onClick={()=>router.push(`MoreInfo/${d[0]}`)} key={d} className="relative transition group hover:bg-blue-600/10 hover:border-blue-400 hover:z-10 cursor-pointer border ">
          {d.map((content:string)=>{
            return<td className="relative indent-2 border group-hover:border-blue-400 group-hover:z-10" key={d.indexOf(content)}>{content}</td>
          })}
          
        </tr>
      })
     }
     
    </tbody>
  </table>
}