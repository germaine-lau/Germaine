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
  display: 'swap',
  preload: true,
});

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
  preload: true,
});

export const metadata = {
  title: 'Germaine Lau',
  description: 'Multidisciplinary designer + art director',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${weirdSerif.variable} ${neueHaas.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}