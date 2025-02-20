import '/styles/landing.css'
import '/styles/landing_style.css'
import '/styles/landing-bck.css'
import '/styles/landing_style-bck.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
