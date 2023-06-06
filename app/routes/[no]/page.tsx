"use client"

import axios from "axios"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"
import { useEffect, useState } from "react"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const No = ( req:NextRequest ) => {

    const { data : session } = useSession()
    const [ data , setData ] = useState({user:[]})
    const [ loading , setLoading ] = useState(true)
    const [ stop , setStop] = useState()
    const [ showStop , setShowstop] = useState(false)
    const [ students, setStudents] = useState([])

    const route = parseInt(req.params.no)

    useEffect( () => {


        const route = parseInt(req.params.no)

        const getData = async () => {

            const { data } = await axios.get('/api/data',{
                params : {
                    rnum : route
                }
            })
            setLoading(false)
            console.log(data)
            return data.data
        }
        getData()
        .then((data)=>setData(data))

    } ,[])

    useEffect(()=>{
        if ( session === null ) redirect(`/auth/signin?callbackUrl=${encodeURIComponent(`routes/`)}`)
    },[session])

    useEffect(()=>{
        console.log(stop)
    },[stop])

    const selectStop = (currStop) => {
        if(stop === currStop){
            setShowstop(false)
            setStop("")
        }else{
            setStop(currStop)
            setShowstop(true)
        }
    }

    return (
    <>
        <div className="bg-[#1c1c1c] h-[100%]">
            <h1 className="text-[#b6b3b1] text-[28px] text-center sticky mb-5 bg-[#161616] p-5 flex justify-center items-center border border-[#2c2c2c] ">
            Route {data.route} : <LocationOnIcon className="m-2" fontSize="large"/> {data.name}</h1>
            <div className="flex flex-row items-center justify-between">
                <div className="border border-white w-96 h-96"></div>
                <div className="flex flex-col justify-center rounded-lg w-full h-full max-w-[400px] items-center p-4 text-black mt-5" >
                    {loading ? (
                    <p className="text-black">loading...</p>
                    ) : (
                        ((data as any).stops as any[]).map((stop, idx)=>(
                            <div key={idx} className="flex flex-col items-center w-full">
                                <div
                                onClick={()=>selectStop(stop.name)}
                                className="w-full max-w-[330px] text-[#b6b3b1] bg-[#222222] 
                                hover:bg-[#707070] hover:text-black border border-[#3e3e3e] py-2 text-center h-10 rounded-lg transition-all cursor-pointer"
                                >{stop.name}</div>
                                {(data.stops.length-1)!=idx && <ArrowDownwardIcon className="text-[#b6b3b1]"/>}
                            </div>
                        ))
                    )}
                </div>
                {showStop && 
                <div className="flex flex-wrap items-center justify-center border border-white w-[500px]">{
                    data.user.filter(i=>i.point==stop).map((user,idx)=>(
                    <div key={idx} className="flex flex-col items-center justify-around h-32 m-5 text-white border border-white w-52">
                    <div>{user.name}</div>
                    <div>{user.branch}</div>
                    <div>{user.gender}</div>
                    <div>{user.phNo}</div>
                    </div>
                    ))
                }</div>}
            </div>
        </div>
    </>
  );
}

export default No;
