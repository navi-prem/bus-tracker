'use client'
import Notification from "@/components/Notification"
import axios from "axios"
import { useRouter } from "next/navigation"
import {useEffect, useState} from "react"
import './globals.css'

const Home = () => {


    const [reg, setReg] = useState('')
    const [pass, setPass] = useState('')
    const[data,setData] = useState('')
    const[status,setStatus] = useState('')
    const[notify,setNotify] = useState(false)
    const [spinner , setSpinner] = useState(false)

    const router = useRouter()
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setNotify(false)
            if(status === "sucess"){
                localStorage.setItem("user",reg)
                router.push('/home')
            }
        },2000)
        return () => clearTimeout(timer)
    },[notify])

    const handleLogin = async (e:any) => {
        e.preventDefault()
        setSpinner(true)

        if((reg==="")||(pass==="")){
                setData("Fill the credentials")
                setStatus("error")
                setNotify(true)
                setSpinner(false)
        }else{
            const { data } = await axios.post('/api', { reg, pass })
            console.log(data)
            if ( data.status == '0' ) {
                setData("Password incorrect")
                setStatus("error")
                setNotify(true)
                setSpinner(false)
            }
            else if ( data.status == '1' ) {
                setData("Logged In sucessfully")
                setStatus("sucess")
                setNotify(true)
            }
            else {
                setData("User Unavailable")
                setStatus("error")
                setNotify(true)
                setSpinner(false)
            }
        }
    }

    return (
        <>
        {notify && <Notification status={status} data={data} />}
        <div className="flex items-center justify-center w-[100vw] h-[100vh]">
            <form onSubmit={handleLogin} className="flex items-center justify-center p-4 border shadow-md rounded-md">
                <div>
                    <label className="text-[#454443]">Reg. No: <br/><input onChange={e => setReg(e.target.value)} className="p-2 text-black border border-black rounded" type="text"/></ label>
                    <br/>
                    <br/>
                    <label className="text-[#454443]">Password: <br/><input onChange={e => setPass(e.target.value)} className="p-2 text-black border border-black rounded" type="password"/></ label>
                    <br/>
                    <br/>
                    <button type='submit' className="w-32 px-3 py-2 font-bold text-black bg-transparent border-2 border-black transition-all rounded-md hover:bg-black hover:text-white">
                    {spinner ?
                    <div className="flex items-center justify-center h-6">
                        <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-black rounded-full">
                        <span className="sr-only">Loading...</span>
                        </div>
                     </div> :
                     <p>Login</p>
                    }
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Home
