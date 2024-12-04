// app/layout.tsx
import React from "react";
import Script from "next/script";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>AR.js with Three.js in Next.js</title>
      </head>
      <body>
        <div id="ar-container">
          {/* Load external scripts */}
          {/* Load Three.js first */}
          <Script
            strategy="afterInteractive"
            src="https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.min.js"
          />
          {/* Load AR.js after Three.js */}
          <Script
            strategy="afterInteractive"
            src="https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js/aframe/build/aframe.min.js"
          />
          <Script
            strategy="afterInteractive"
            src="https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js/aframe/build/ar.js"
          />
        </div>

        {children}
      </body>
    </html>
  );
}
