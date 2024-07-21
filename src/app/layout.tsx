import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spready",
  description: "유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 투자 결정에 도움을 주는 객관적인 데이터를 제공합니다.",
  keywords: "코인, 암호화폐, 유튜브, 투자, 리딩, 사기 방지, 수익률 분석, 투자 도구",
  openGraph: {
    title: "코인 추천 유튜버 분석 도구",
    description: "유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 객관적인 데이터로 현명한 투자 결정을 도와드립니다.",
    type: "website",
    url: "https://spready.kr",
    images: [
      {
        url: "https://spready.kr/main.png",
        alt: "Spready Main Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "코인 추천 유튜버 분석 도구",
    description: "유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 객관적인 데이터로 현명한 투자 결정을 도와드립니다."
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Spready</title>
        <meta name="description" content="유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 투자 결정에 도움을 주는 객관적인 데이터를 제공합니다." />
        <meta name="keywords" content="코인, 암호화폐, 유튜브, 투자, 리딩, 사기 방지, 수익률 분석, 투자 도구" />
        <meta name="author" content="Spready" />
        <meta property="og:title" content="코인 추천 유튜버 분석 도구" />
        <meta property="og:description" content="유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 객관적인 데이터로 현명한 투자 결정을 도와드립니다." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://spready.kr" />
        <meta property="og:image" content="https://spready.kr/main.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="코인 추천 유튜버 분석 도구" />
        <meta name="twitter:description" content="유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 객관적인 데이터로 현명한 투자 결정을 도와드립니다." />
        <meta name="twitter:image" content="https://spready.kr/main.png" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7656508177587264" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7656508177587264" crossOrigin="anonymous"></script>
        {children}
      </body>
    </html>
  );
}
