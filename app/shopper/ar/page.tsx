'use client'
import dynamic from 'next/dynamic';


const ARView = dynamic(
    () => import('@/components/ARView'),
    { ssr: false } // This will prevent the component from rendering server-side
  );
  
  export default function Page() {
    return (
      <div>
         <h1>AR Measurement App</h1>
        <ARView />
      </div>
    );
  }


