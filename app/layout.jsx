export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>VideoCrafter.io</title>
        <link href="/images/iconlogo.svg" rel="icon" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
