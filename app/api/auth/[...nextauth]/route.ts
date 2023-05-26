import {prisma} from '@/prisma/prisma'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {NextRequest, NextResponse} from 'next/server'

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'CREDENTIALS',
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req: NextRequest) {
                const { reg, pass } = credentials
                console.log(reg, pass)
                const user = await prisma.user.findUnique({
                    where: {
                        reg,
                    }
                })
                if ( user === undefined || user === null ) {
                    throw new Error('Invalid User Name')
                }
                if ( user.pass !== pass ) {
                    throw new Error('Invalid Password')
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
