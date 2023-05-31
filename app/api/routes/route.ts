import {prisma} from "@/prisma/prisma"
import {NextRequest, NextResponse} from "next/server"

export async function GET(req: NextRequest) {
    const route = parseInt(req.nextUrl.searchParams.get('no'))
    const data = await prisma.bus.findUnique({
        where: {
            route,
        },
        include: {
            stops: true
        }
    })
    return NextResponse.json(data)
}
