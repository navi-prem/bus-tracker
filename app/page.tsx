'use client'
import {signIn, useSession} from "next-auth/react"
import {useEffect} from "react"
import { usePathname, useRouter } from "next/navigation"

const Home = () => {
    const pathname = usePathname()
    const router = useRouter()

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push(`auth/signin?callbackUrl=${encodeURIComponent(pathname)}`)
        }
    })

    // useEffect(() => {
    //     if ( status === 'unauthenticated' ) router.push('/auth/signin')
    // }, [status])

    return <button onClick={() => console.log(status, session)}>Click</button>
}

export default Home
