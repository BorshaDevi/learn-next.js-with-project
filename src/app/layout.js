import CommonLayout from '@/Component/Layout/layout'
import './globals.css'
export const metadata = {
  title: 'E-commarch project',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CommonLayout>
        {children}
        </CommonLayout>
        </body>
    </html>
  )
}
