import { NextResponse } from "next/server";
import data from '@/bus1.json'

export async function GET(){
   return NextResponse.json({data}) 
}
