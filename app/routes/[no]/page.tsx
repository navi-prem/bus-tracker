import {authOptions} from "@/app/api/auth/[...nextauth]/route"
import {prisma} from "@/prisma/prisma"
import {getServerSession} from "next-auth"
import {redirect} from "next/navigation"
import {NextRequest, NextResponse} from "next/server"

const No =  async (req: NextRequest, res:NextResponse) => {
    const session = await getServerSession(authOptions)
    const route = parseInt(req.params.no)
    if ( !session ) redirect(`/auth/signin?callbackUrl=${encodeURIComponent(`routes/${route}`)}`)
    let data = {}
    data.bus = await prisma.bus.findUnique({
        where: {
            route,
        },
        include: {
            stops: true,
        },
    })
    if ( session && session.user.name === '1' ) {
        data.user = await prisma.user.findMany()
    }
    return <>{JSON.stringify(data)}</>
}

export default No
