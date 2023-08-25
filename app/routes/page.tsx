import prisma from "@/prisma/prisma"
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
            <span className="text-3xl text-center">Click on the route numbers to view details</span><br/>
            <div className="flex flex-row">
                {data.map((bus , idx) =>
                <div key={idx}><Link key={bus.route} className='p-4 m-4 bg-[#2b825b] h-30px w-20px rounded-md text-white' href={`/routes/${bus.route}`}><span className="text-5xl">{bus.route}</span>{bus.name}</Link> </div>)}
            </div>
            </div>
        </>
    )
}

export default Routes

