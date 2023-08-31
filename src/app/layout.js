import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header';
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Analytics /></body>
    </html>
  )
}
