import {prisma} from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req :NextRequest){
   const route : any= req.nextUrl.searchParams.get('rnum')
   const rnum = parseInt(route)
   console.log(typeof(rnum))
   console.log(rnum)
   console.log(req.nextUrl.searchParams.get('rnum'))
   const data = await prisma.bus.findUnique({
       where : {
           route : rnum
       }, include : {
            user : true ,
            stops : true
       }
   })
   return NextResponse.json({data})
}
