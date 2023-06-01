import {prisma} from "@/prisma/prisma"
import Link from 'next/link'

const Routes = async () => {
    const data = await prisma.bus.findMany()
    return (
        <>
            {data.map(bus => <Link key={bus.route} className='p-4 m-4 bg-yellow-500 h-20px w-20px rounded-md' href={`/routes/${bus.route}`}>{bus.route}</Link>)}
        </>
    )
}

export default Routes
