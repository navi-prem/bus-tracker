import { prisma } from "@/prisma/prisma"
import {NextRequest, NextResponse} from "next/server"

export async function POST( req:NextRequest ) {
    const { reg, pass } = await req.json()
    const current = await prisma.user.findUnique({
        where: {
            reg
        }
    })
    if ( current === null ) return NextResponse.json({status: 2})
    if ( current.pass !== pass ) return NextResponse.json({status: 0})
    return NextResponse.json({status: 1})
}
