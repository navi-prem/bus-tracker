"use client"

import axios from "axios"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"
import { useEffect, useState } from "react"

const No = ( req:NextRequest ) => {

    const { data : session } = useSession()
    const [ data , setData ] = useState({})
    const [ loading , setLoading ] = useState(true)

    useEffect( () => {


        const route = parseInt(req.params.no)
        if ( session === null  ) redirect(`/auth/signin?callbackUrl=${encodeURIComponent(`routes/${route}`)}`)

        const getData = async () => {

            const { data } = await axios.get('/api/data',{
                params : {
                    rnum : route
                }
            })
            setLoading(false)

            return data.data
        }
        getData()
        .then((data)=>setData(data))


    } ,[])



    return <>
        <div className="flex justify-center items-center w-[100vw] h-[100vh] text-white">
            {loading ? <p>loading</p> : JSON.stringify(data) }
        </div>
    </>
}

export default No;
