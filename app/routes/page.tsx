"use client"
import {useState} from "react";
import Image from "next/image";
import bus from "@/public/bus.png"
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

const Routes = () => {

    const [ route,setRoute ] = useState('');
    const [fetch,setFetch] = useState(false)

    const handleSearch = async(e : any) => {
      e.preventDefault();
      const routeNo = route
      const {data} = await axios.get('/api/data',{
        params : {
            routeNo
        }
      })
      console.log(data)
      setFetch(true)
    }

    return (
        <>
            <div className="top-0 flex flex-col items-center justify-center h-screen">
                <div className="flex flex-col p-4 text-center">
                    <div className='flex items-center'>
                        <h1 className="block mb-2 text-3xl">Enter the Route Number</h1>
                        <Image src={bus} height={60} alt="bus" />
                    </div>
                    <div className="flex items-center justify-center mt-5" >
                        <form onSubmit={(e)=>handleSearch(e)}>
                            <input type="tel" min='1'  max="33" className="w-20 p-2 border border-gray-300 rounded-md" onChange={(e)=>setRoute(e.target.value)}/>
                            <button type="submit"><SearchIcon className="m-2"/></button>
                        </form>
                    </div>
                    {fetch && <GetDetails routeNo={route}/>}
                </div>
            </div>
        </>
    )
}
export default Routes

const GetDetails = ({routeNo}:any) => {

    const [phone , setPhone] = useState("")
    const [name, setName] = useState("")

    return(<>
     <div className='border border-solid border-blue-500 rounded-md w-[90%] h-[60%]'>
        <div className="p-4 mt-10">
            <h3>ROUTE NO : {routeNo}</h3>
            <h3>DETAILS</h3>
           <div className="flex flex-col items-center mb-4 p-[20px]">
              <div className='w-40 h-40 mb-5 border border-gray-500 border-solid rounded-full'>
              </div>
                  <p className="font-medium">{name}</p>
                  <p className="text-gray-500">{phone}</p>
           </div>
            <div>
                <button className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md">STUDENT DETAILS</button>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md">BOARDING POINTS</button>
            </div>
         </div>
    </div>
 </>);
}
