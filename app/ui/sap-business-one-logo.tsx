import React from 'react';
import Image from 'next/image';

interface SAPBusinessOneLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function SAPBusinessOneLogo({
  className = '',
  width = 150,
  height = 30
}: SAPBusinessOneLogoProps) {

  // Use the PNG image now that it's saved
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/sap-business-one-logo.png"
        alt="SAP Business One"
        width={width}
        height={height}
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
          height: 'auto'
        }}
        priority
      />
    </div>
  );
}
