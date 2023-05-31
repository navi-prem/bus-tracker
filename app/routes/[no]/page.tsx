'use client'
import axios from "axios"
import {usePathname} from "next/navigation"
import {useEffect, useState} from "react"

const No = () => {
    const pathname = usePathname()
    const no = pathname.slice(8)
    const [data, setData] = useState([])

    useEffect(() => {
        const get = async () => {
            const { data } = await axios.get('/api/routes', {
                params: {
                    no
                }
            })
            setData(data)
        }
        get()
    }, [])

    return <>{JSON.stringify(data)}</>
}

export default No
