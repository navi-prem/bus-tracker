import './globals.css'
import { Exo_2, Noto_Sans, Nunito, Source_Sans_Pro } from 'next/font/google'
import Provider from '@/components/Provider'

const montserrat=Exo_2({weight:"600", subsets: ['latin'] })
export const metadata = {
  title: 'CIT BUS',
  description: 'Website for CIT students to make their bus ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className + ' h-screen w-screen'}>
        <Provider >
            {children}
        </ Provider>
      </body>
    </html>
  )
}
