import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {NextRequest} from 'next/server'
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
                    let obj = { name: reg }
                    obj.email = {}
                    if ( user?.name === '' ) obj.email.inc = 1
                    else obj.email.inc = 0
                    return obj
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
