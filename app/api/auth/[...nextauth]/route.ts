import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {NextRequest, NextResponse} from 'next/server'
import {prisma} from '@/prisma/prisma'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'CREDENTIALS',
            type: 'credentials',
            credentials: {},
            async authorize (credentials, req: NextRequest) {
                const { reg, pass } = credentials
                const user = await prisma.user.findUnique({
                    where: {
                        reg,
                    }
                })
                if ( user === undefined || user === null ) {
                    throw new Error('Invalid User Name')
                }else if ( user.pass !== pass ) {
                    throw new Error('Invalid Password')
                }else{
                    if(user?.name==''){
                        return{name : "Hello"}
                    }
                }
                console.log(user)
                return { name: reg }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
