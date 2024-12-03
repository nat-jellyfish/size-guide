import '@/app/ui/global.css';
import {inter} from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
          {/* Add the Three.js CDN script */}
          {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.138.3/three.min.js"></script> */}
         {/* <script src='/index.js'></script> */}
        </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

