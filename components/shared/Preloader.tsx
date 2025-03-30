// "use client"
// import { useEffect, useState } from 'react';
// import Image from 'next/image';

// interface LoaderProps {
//   onLoadingComplete: () => void;
//   logoSrc: string;
// }

// const Loader = ({ onLoadingComplete, logoSrc }: LoaderProps) => {
//   const [progress, setProgress] = useState(0);
  
//   useEffect(() => {
//     const startTime = Date.now();
//     const duration = 2000; // 3 seconds
    
//     const updateProgress = () => {
//       const elapsed = Date.now() - startTime;
//       const newProgress = Math.min(100, (elapsed / duration) * 100);
//       setProgress(newProgress);
      
//       if (newProgress < 100) {
//         requestAnimationFrame(updateProgress);
//       } else {
//         onLoadingComplete();
//       }
//     };
    
//     requestAnimationFrame(updateProgress);
    
//     return () => {
//       // Cleanup if needed
//     };
//   }, [onLoadingComplete]);
  
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//       <div className="relative">
//         {/* Circle container */}
//         <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
//           <Image
//             src="/images/logos/logo.png"
//             alt="Logo"
//             width={96}
//             height={96}
//             className="object-cover"
//             priority
//           />
//         </div>
        
//         {/* Circular progress indicator */}
//         <div 
//           className="absolute inset-0 w-24 h-24 rounded-full" 
//           style={{
//             background: `conic-gradient(#16a34a ${progress}%, transparent ${progress}%)`,
//             maskImage: 'radial-gradient(transparent 60%, black 62%)',
//             WebkitMaskImage: 'radial-gradient(transparent 60%, black 62%)'
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Loader;


"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoaderProps {
  onLoadingComplete: () => void;
  logoSrc?: string;
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000; // 2 seconds
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        onLoadingComplete();
      }
    };
    
    requestAnimationFrame(updateProgress);
    
    return () => {
      // Cleanup if needed
    };
  }, [onLoadingComplete]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative">
        {/* Circle container - responsive sizing */}
        {/* <div className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
          <Image
            src="/images/logos/logo.png"
            alt="Logo"
            fill
            className="object-cover"
            priority
          />
        </div> */}
        
        {/* Circular progress indicator - matching the container size */}
        <div 
          className="absolute inset-0 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full" 
          style={{
            background: `conic-gradient(#16a34a ${progress}%, transparent ${progress}%)`,
            maskImage: 'radial-gradient(transparent 60%, black 62%)',
            WebkitMaskImage: 'radial-gradient(transparent 60%, black 62%)'
          }}
        />
      </div>
    </div>
  );
};

export default Loader;