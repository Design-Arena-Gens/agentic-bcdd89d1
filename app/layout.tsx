export const metadata = {
  title: 'Monkey and Lion Story',
  description: 'An animated story about a monkey and a lion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
