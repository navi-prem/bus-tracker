import {prisma} from "@/prisma/prisma"
import {NextRequest} from "next/server"

const No =  async (req: NextRequest) => {
    const route = parseInt(req.params.no)
    const data = await prisma.bus.findUnique({
        where: {
            route,
        },
        include: {
            stops: true,
            user : true
        },
    })
    return <>{JSON.stringify(data)}</>
}

export default No
