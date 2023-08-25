'use client'
import axios from "axios"
import {signOut, useSession} from "next-auth/react"
import {useEffect, useState} from "react"
import { usePathname, useRouter } from "next/navigation"
import LogoutIcon from '@mui/icons-material/Logout'

const Home = () => {
    const pathname = usePathname()
    const router = useRouter()

    const { data: session } = useSession<any>({
        required: true,
        onUnauthenticated() {
            router.push(`auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
        }
    })

    console.log(session)

    const[name,setName] = useState<any>("")
    const[branch,setBranch] = useState<any>("")
    const[location,setLocation] = useState<any>("")
    const[filled,setFilled] = useState<any>(false)

    useEffect( ()=>{
        //@ts-ignore
        if(session.user.email.inc === 0){
            setFilled(true)
        }else{
            setFilled(false)
        }
    }
    ,[session])

    const submit =  async (e:any) => {
        e.preventDefault()
        const {data} = await axios.post('/api/details',{
            //@ts-ignore
            reg: session.user?.name, name, branch, location
        })
        console.log(data)
        setName("")
        setBranch("")
        setLocation("")
    }

    if (!(filled)) return(<>
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
    else return(<>
        <div className="flex justify-center items-center w-full h-full text-[#b6b3b1] text-3xl">
        You have already filled the form contact Transport Incharge to edit your details
        </div>
    </>);
}

export default Home
