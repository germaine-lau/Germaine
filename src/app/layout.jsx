import './globals.css';
import localFont from 'next/font/local';

const weirdSerif = localFont({
  src: [
    {
      path: '../fonts/OTWeirdSerif-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/OTWeirdSerif-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-weird-serif',
})

const neueHaas = localFont({
  src: [
    {
      path: '../fonts/NeueHaasGrotText-55Roman-Trial.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-neue-haas',
  display: 'swap',
})

export const metadata = {
  title: 'Germaine Lau',
  description: 'Multidisciplinary designer + art director',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${weirdSerif.variable} ${neueHaas.variable}`}>
        {children}
      </body>
    </html>
  );
}