import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bible Random Generator',
  description: 'Generate random bible reference.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <header className='text-2xl p-12 text-center font-semibold'>Bible Random Generator</header>
        <main>{children}</main>
        </body>
    </html>
  )
}
