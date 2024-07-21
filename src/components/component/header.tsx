'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const Ad = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7656508177587264';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    const adsbygoogle = document.createElement('script');
    adsbygoogle.innerHTML = `
      (adsbygoogle = window.adsbygoogle || []).push({});
    `;
    document.body.appendChild(adsbygoogle);
  }, []);

  return (
    <div className="flex items-center">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-7656508177587264"
           data-ad-slot="1773657493"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

const Header: React.FC = () => {
  const [adHeight, setAdHeight] = useState(320);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    if (scrollPosition === lastScrollY) return; // Scroll이 변하지 않았으면 무시
    setLastScrollY(scrollPosition);

    const newHeight = Math.max(0, 320 - scrollPosition);
    if (newHeight !== adHeight) {
      setAdHeight(newHeight);
    }
  }, [adHeight, lastScrollY]);

  useEffect(() => {
    const onScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return (
    <>
      <div style={{ height: `${adHeight}px`, overflow: 'hidden', transition: 'height 0.3s' }}>
        <Ad />
      </div>
      <header className="bg-red-500 text-white py-4 px-6 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <CoinsIcon className="w-6 h-6" />
          <span className="text-lg font-semibold">Spready</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          {/* Navigation items */}
        </nav>
      </header>
    </>
  );
};

export default Header;

function CoinsIcon(props: any) {
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
