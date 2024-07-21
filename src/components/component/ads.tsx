'use client';

import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const DisplayAds = () => {
  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
      } catch (e) {
        console.error(e);
      }
    };

    let interval = setInterval(() => {
      if (typeof window.adsbygoogle !== 'undefined') {
        pushAd();
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'block',
      }}
      data-adClient="ca-pub-7656508177587264"
      data-adSlot="1773657493"
      data-adFormat="auto"
      data-fullWidthResponsive="true"
    />
  );
};

export default DisplayAds;