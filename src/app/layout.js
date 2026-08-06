import './globals.css'

export const metadata = {
  title: 'Portfolio | Unlock the Career You Deserve',
  description: 'Professional portfolio and career coaching services.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
