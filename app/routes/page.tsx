import {prisma} from "@/prisma/prisma"
import Link from 'next/link'

const Routes = async () => {
    const data = await prisma.bus.findMany({
        orderBy :{
            route : 'asc'
        }
    })
    return (
        <>
            <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] text-white">
            <span className="text-3xl">Click on the route numbers to view details</span><br/>
            <span className="flex flex-row">
                {data.map(bus => <Link key={bus.route} className='p-4 m-4 bg-[#2b825b] h-20px w-20px rounded-md text-white' href={`/routes/${bus.route}`}>{bus.route}</Link>)}
            </span>
            </div>
        </>
    )
}

export default Routes

