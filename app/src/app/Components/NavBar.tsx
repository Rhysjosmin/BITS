import Image from "next/image"
import { SVGProps } from "react"


function FluentMdl2NumberedListText(props: SVGProps<SVGSVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" {...props}><path fill="currentColor" d="M512 1536v-128h1536v128H512zm0-1152h1536v128H512V384zm0 640V896h1536v128H512z"></path></svg>
    )
  }

  
function FluentMdl2Search(props: SVGProps<SVGSVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048" {...props}><path fill="currentColor" d="M1344 0q97 0 187 25t168 71t142 110t111 143t71 168t25 187q0 97-25 187t-71 168t-110 142t-143 111t-168 71t-187 25q-125 0-239-42t-211-121l-785 784q-19 19-45 19t-45-19t-19-45q0-26 19-45l784-785q-79-96-121-210t-42-240q0-97 25-187t71-168t110-142T989 96t168-71t187-25zm0 1280q119 0 224-45t183-124t123-183t46-224q0-119-45-224t-124-183t-183-123t-224-46q-119 0-224 45T937 297T814 480t-46 224q0 119 45 224t124 183t183 123t224 46z"></path></svg>
    )
  }
function SearchBar(){
    return <div className="flex items-center ">
        <input className="h-8 w-80 indent-2" />
        <button className="bg-blue-300 h-8 w-auto aspect-square flex items-center justify-center">
        <FluentMdl2Search/>
        </button>
    </div>
}
function Profile(){
    return <div className='bg-blue-200 rounded p-2 flex gap-4 items-center '>
        <h1>Dr. John</h1>
        <Image className="rounded" height={28} width={28} unoptimized={true} src={'/profile.png'} alt=""/>
    </div>
}
export function NavBar(){
    return<div className={`bg-blue-100  flex p-2 gap-2  items-center justify-between`}>
    <FluentMdl2NumberedListText className="h-6 w-auto aspect-square"/>
    <SearchBar/>
    <Profile/>
    </div>
}