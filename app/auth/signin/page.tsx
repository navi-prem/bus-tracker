'use client'
import {useEffect, useState} from "react"
import { signIn, useSession } from 'next-auth/react'
import {useRouter, useSearchParams} from "next/navigation"
import ErrorIcon from '@mui/icons-material/Error';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Home = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const callbackUrl = searchParams.get('callbackUrl')

    const { data:session, status } = useSession()
    const [reg, setReg] = useState('')
    const [pass, setPass] = useState('')
    const [loading, setLoading] = useState(false)
    const [uerror, setUerror] = useState(false)
    const [perror, setPerror] = useState(false)

    useEffect(() => {
        if ( status === 'authenticated' ) {
            router.push(callbackUrl || '/routes')
        }
    }, [status])

    const handleLogin = async (e:any) => {
        e.preventDefault()
        setLoading(true)
        setUerror(false)
        setPerror(false)
        if(reg=='') {
            setUerror(true)
        }else if (pass==''){
            setPerror(true)
        }else{
            const res = await signIn('credentials', {
                reg, pass, redirect: false
            })
            if(res?.error == 'Invalid User Name'){
                setUerror(true)
            }else if(res?.error == 'Invalid Password'){
                setPerror(true)
            }
        }
        setLoading(false)
    }

    return (<>
        <div className="flex items-center justify-center w-full h-full">
            <form onSubmit={handleLogin} className="flex items-center justify-center p-4 w-96 rounded-md">
                <div>
                    <div className="my-2 text-2xl text-white">Welcome to CIT BUS</div>
                    <div className="mb-8 text-[#b1b3b6]">Sign in to your account</div>
                    <label className="text-[0.9rem] text-[#b6b3b1]">Registeration Number
                        <br/>
                        <PersonIcon/>
                        <input onChange={e => setReg(e.target.value)}
                        placeholder="Your Registeration number"
                        className={`m-2 text-[1 rem] h-10 w-[80%] text-white border
                        ${ uerror?'border-[#822025]':'border-[#3e3e3e]'}
                        ${ uerror?'bg-[#1f1315]':'bg-[#222222]'}
                        rounded placeholder:text-[#504e4b] p-2`}
                        type="text"/>
                        { uerror && <span className="text-[#e5484d]"><ErrorIcon className="mr-2 text-[#e5484d]"/>Invalid User Name</span>}
                    </label>
                    <br/>
                    <br/>
                    <label className="text-[0.9rem] text-[#b6b3b1]">Password
                        <br/>
                        <LockIcon/>
                        <input onChange={e => setPass(e.target.value)}
                        placeholder="Password"
                        className={`m-2 text-[1 rem] h-10 w-[80%] text-white border 
                        ${ perror?'border-[#822025]':'border-[#3e3e3e]'}
                        ${ perror?'bg-[#1f1315]':'bg-[#222222]'}
                        rounded placeholder:text-[#504e4b] p-2 transition-all`}
                        type="password"/>
                        { perror && <span className="text-[#e5484d]"><ErrorIcon className="mr-2 text-[#e5484d]"/>Invalid Password</span>}
                    </label>
                    <br/><br/>
                    <div><button type='submit'
                        className="px-3 py-2 w-11/12 text-black bg-[#e8bf07] transition-all rounded-md hover:bg-[#40bf86] hover:text-white flex justify-center items-center">
                        {loading ?
                            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full">
                            <span className="sr-only">Loading...</span>
                            </div> : <span>Login</span>
                        }
                    </button></div>
                    <div className="my-5 text-[#70706b] text-sm text-center">
                        By signing-in to this website you can unleash the status of all the bus routes and details of buses in CIT Chennai
                    </div>
                </div>
            </form>
        </div>
    </>
    )
}

export default Home
