import prisma from "@/prisma/prisma"
import {NextRequest, NextResponse} from "next/server"

export async function POST( req:NextRequest ) {
    const { reg,name, location , branch} = await req.json()
    console.log(name,branch,location)
    const current = await prisma.user.update({
        where: {
            reg,
        },
        data : {
            name,branch,location
        },
    })
    return NextResponse.json({current})
}
