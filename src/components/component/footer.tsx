'use client';

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-red-500 text-white py-4 px-6 flex items-center justify-between">
      <p className="text-sm font-medium">&copy; 2024 Spready. All rights reserved.</p>
      <div className="hidden md:flex items-center gap-4">
        <Link href="#" className="hover:underline font-medium" prefetch={false}>
          ✉️ Mail : kse0119@naver.com
        </Link>
        
      </div>
    </footer>
  );
}
