'use client';

import Link from 'next/link'
import AdsenseOnheader from "@/components/component/adsensehd";


const Header: React.FC = () => {
 
  return (
    <>
    <div className="bg-red-500 justify-center" style={{ height: `${250}px`}}>
      <AdsenseOnheader/>
    </div>
    <header className="bg-red-500 text-white py-4 px-6 flex items-center justify-between">
    <Link href="#" className="flex items-center gap-2" prefetch={false}>
      <CoinsIcon className="w-6 h-6" />
      <span className="text-lg font-semibold">Spready</span>
    </Link>
    <nav className="hidden md:flex items-center gap-4">

    </nav>

  </header>
  </>
  );
};

export default Header;


function CoinsIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

