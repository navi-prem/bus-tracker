'use client'
import axios from "axios"
import {useState} from "react"

const Home = () => {

    const [reg, setReg] = useState('')
    const [pass, setPass] = useState('')

    const handleLogin = async (e:any) => {
        e.preventDefault()
        const { data } = await axios.post('/api', { reg, pass })
        console.log(data)
        if ( data.status == '0' ) {
            console.log('pass inc')
        }
        else if ( data.status == '1' ) {
            console.log('Success')
        }
        else {
            console.log('user inc')
        }
    }

    return (
        <div className="flex items-center justify-center w-full h-full">
            <form onSubmit={handleLogin} className="border-2 border-black rounded-md p-4 h-[65%] w-[25%] flex items-center justify-center">
                <div>
                    <label className="font-bold text-[1.5rem]">Reg. No: &nbsp;&nbsp;&nbsp;&nbsp; <input onChange={e => setReg(e.target.value)} className="p-2 m-2 border border-black rounded" type="text"/></ label>
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
