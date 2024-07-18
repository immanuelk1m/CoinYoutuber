import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    // 구글 애드센스 스크립트를 추가합니다.
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.setAttribute("data-ad-client", "ca-pub-7656508177587264");
    document.head.appendChild(script);

    const adsScript = document.createElement("script");
    adsScript.innerHTML = "(adsbygoogle = window.adsbygoogle || []).push({});";
    document.head.appendChild(adsScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(adsScript);
    };
  }, []);

  return (
    <header className="bg-red-500 text-white py-4 px-6 flex items-center justify-between">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <CoinsIcon className="w-6 h-6" />
        <span className="text-lg font-semibold">Spready</span>
      </Link>
      <nav className="hidden md:flex items-center gap-4">
        <Link href="#" className="hover:underline font-medium" prefetch={false}>
          About
        </Link>
        <Link href="#" className="hover:underline font-medium" prefetch={false}>
          Contact
        </Link>
      </nav>
      <Button variant="outline" size="sm" className="md:hidden">
        <MenuIcon className="w-5 h-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      {/* 애드센스 광고 추가 */}
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7656508177587264"
        data-ad-slot="4862645834"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </header>
  );
}

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

function MenuIcon(props: any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
