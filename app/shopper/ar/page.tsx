'use client'
import dynamic from 'next/dynamic';


const ARMeasure = dynamic(
    () => import('@/components/ARMeasure'),
    { ssr: false } // This will prevent the component from rendering server-side
  );
  
  export default function Page() {
    return (
      <div>
        <ARMeasure />
      </div>
    );
  }


