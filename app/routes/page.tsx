import {prisma} from "@/prisma/prisma"
import Link from 'next/link'

const Routes = async () => {
    const data = await prisma.bus.findMany()
    return (
        <>
            {data.map(bus => <Link key={bus.route} href={`/routes/${bus.route}`}>{bus.route}</Link>)}
        </>
    )
}

export default Routes
