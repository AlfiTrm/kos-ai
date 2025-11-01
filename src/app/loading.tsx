import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <div className="absolute h-full w-full rounded-full bg-gradient-to-r from-purple-1 to-orange-1 opacity-75 animate-ping"></div>
        
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white">
          <Image
            src="/logo/logo.png"
            alt="Loading..."
            width={60}
            height={60}
            priority
          />
        </div>
      </div>
    </div>
  );
}