import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'material-symbols'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FootLab',
  description: 'Online Shoe Store',
  icons:[
    {
      url:"/icon.png",
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/icon.png',
      media: '(prefers-color-scheme: dark)',
    },
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='w-full h-full'>


      <body className={inter.className} style={{width:"100%",height:"100%"}}>{children}</body>
    </html>
  )
}
