import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showText = true }) => {
  const dimensionClass = {
    sm: 'w-10 h-10',
    md: 'w-13 h-13',
    lg: 'w-20 h-20',
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Circular Emblem matching Facebook Profile Badge */}
      <div className={`relative ${dimensionClass} rounded-full bg-white border-2 sm:border-[2.5px] border-[#0f296b] shadow-md flex items-center justify-center p-1 shrink-0 overflow-hidden`}>
        {/* Navy Ring Accent */}
        <div className="w-full h-full rounded-full border border-blue-900/30 flex flex-col items-center justify-center relative bg-gradient-to-b from-white via-white to-slate-50">
          {/* Stylized Cyan/Royal Blue Car Outline */}
          <svg
            viewBox="0 0 100 45"
            className="w-[82%] h-auto drop-shadow-sm -mt-0.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Aerodynamic Cyan/Blue Upper Arch */}
            <path
              d="M10 32 C18 20, 32 10, 52 10 C72 10, 84 20, 92 32"
              stroke="#0284c7"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {/* Windshield divider */}
            <path
              d="M45 12 L38 30"
              stroke="#0f296b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Speed Swoosh */}
            <path
              d="M26 23 C42 16, 68 16, 80 26"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Wheels / Dark Chassis base */}
            <circle cx="28" cy="34" r="6" fill="#0f172a" />
            <circle cx="28" cy="34" r="2.5" fill="#e2e8f0" />
            <circle cx="74" cy="34" r="6" fill="#0f172a" />
            <circle cx="74" cy="34" r="2.5" fill="#e2e8f0" />
            <rect x="34" y="31" width="34" height="4" rx="2" fill="#0f172a" />
          </svg>

          {/* Micro text inside badge */}
          <div className="w-[90%] bg-[#0f296b] rounded-[3px] py-[1.5px] px-1 text-center -mt-1 shadow-sm">
            <span className="text-[6.5px] sm:text-[7px] font-black tracking-tighter text-white block uppercase leading-none font-sans">
              LEGENDARY
            </span>
          </div>
          <span className="text-[5px] sm:text-[5.5px] font-bold text-red-600 tracking-tight uppercase leading-tight scale-90">
            BUY WITH CONFIDENCE
          </span>
        </div>
      </div>

      {/* Brand Text Branding */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xl sm:text-2xl font-black tracking-tight uppercase text-white font-sans drop-shadow-sm">
              Legendary <span className="text-blue-400">Parts</span>
            </span>
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-red-600 text-white tracking-wider shadow-sm">
              Center
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-300">
            <span className="text-red-400 tracking-wide font-bold">BUY WITH CONFIDENCE</span>
            <span className="text-slate-500">·</span>
            <span className="text-blue-300 hidden sm:inline">Quality That Lasts</span>
          </div>
        </div>
      )}
    </div>
  );
};
