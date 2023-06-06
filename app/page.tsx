'use client'
import axios from "axios"
import {signOut, useSession} from "next-auth/react"
import {useEffect, useState} from "react"
import { usePathname, useRouter } from "next/navigation"
import LogoutIcon from '@mui/icons-material/Logout'

const Home = () => {
    const pathname = usePathname()
    const router = useRouter()

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
        }
    })

    console.log(session)

    const[name,setName] = useState("")
    const[branch,setBranch] = useState("")
    const[location,setLocation] = useState("")

    const submit =  async (e) => {
        e.preventDefault()
        const {data} = await axios.post('/api/details',{
            reg: session.user?.name, name, branch, location
        })
        console.log(data)
        setName("")
        setBranch("")
        setLocation("")
    }

    if ( session?.user?.email.inc == 1 ) return(<>
        <span className="fixed top-0 right-0 m-5 text-white">
        <button onClick={()=>signOut()}>
            <LogoutIcon/>
        </button>
        </span>
        <div className="flex items-center justify-center w-[100vw] h-[100vh]">
        <form className="p-5" onSubmit={(e)=>submit(e)}>
            <label className="text-[0.9rem] text-[#b6b3b1]"> Name <br/>
                <input className="my-3 text-[1 rem] h-10 w-96 text-white border border-[#3e3e3e] rounded bg-[#222222] placeholder:text-[#504e4b] p-2"
                onChange={(e)=>{setName(e.target.value)}}
                placeholder="Your Name"
                value={name}/>
                <br/>
            </label >
            <label className="text-[0.9rem] text-[#b6b3b1]"> Branch<br/>
                <input
                placeholder="Your Branch"
                className="my-3 text-[1 rem] h-10 w-96 text-white border border-[#3e3e3e] rounded bg-[#222222] placeholder:text-[#504e4b] p-2" 
                onChange={(e)=>{setBranch(e.target.value)}} value={branch}/>
            </label>
            <br/>
            <label className="text-[0.9rem] text-[#b6b3b1]"> Location<br/>
                <textarea
                placeholder="Your location goes here"
                className="my-3 text-[1 rem] h-40 w-96 text-white border border-[#3e3e3e] rounded bg-[#222222] placeholder:text-[#504e4b] p-2"
                onChange={(e)=>{setLocation(e.target.value)}} value={location}/>
            </label>
            <br/>
            <button type="submit" className="px-3 py-2 w-96 text-white bg-[#2b825b] transition-all rounded-md hover:bg-[#40bf86] hover:text-white">Submit</button>
        </form>
        </div>
    </>)
    else return (
            <div className="flex items-center justify-center w-full h-full">
                <pre className="text-[#e8bf07] text-xl">You  have  already  filled  out  this  form</pre>
            </div>
        )
}

export default Home
