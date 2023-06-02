'use client'
import {useEffect, useState} from "react"
import { signIn, useSession } from 'next-auth/react'
import {useRouter, useSearchParams} from "next/navigation"

const Home = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const callbackUrl = searchParams.get('callbackUrl')
    console.log(callbackUrl)

    const { data:session, status } = useSession()
    const [reg, setReg] = useState('')
    const [pass, setPass] = useState('')

    useEffect(() => {
        if ( status === 'authenticated' ) {
            router.push(callbackUrl || '/')
        }
    }, [status])

    const handleLogin = async (e:any) => {
        e.preventDefault()
        const res = await signIn('credentials', {
            reg, pass, redirect: false
        })
    }

    return (
        <div className="flex items-center justify-center w-full h-full">
            <form onSubmit={handleLogin} className="border-2 border-black rounded-md p-4 h-[65%] w-[25%] flex items-center justify-center">
                <div>
                    <label className="font-bold text-[1.5rem]">Reg. No: &nbsp;&nbsp;&nbsp; <input onChange={e => setReg(e.target.value)} className="p-2 m-2 border border-black rounded" type="text"/></ label>
                    <br/>
                    <br/>
                    <label className="font-bold text-[1.5rem]">Password: <input onChange={e => setPass(e.target.value)} className="p-2 m-2 border border-black rounded" type="password"/></ label>
                    <br/>
                    <br/>
                    <button type='submit' className="px-3 py-2 font-bold text-black bg-transparent border-2 border-black transition-all rounded-md hover:bg-black hover:text-white">LOGIN</button>
                </div>
            </form>
        </div>
    )
}

export default Home
