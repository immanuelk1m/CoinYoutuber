"use client";

import React, { useState, useRef, useEffect } from 'react';
import Search from "@/components/component/search";
import ResultTable from "@/components/component/result-table";
import Spiner from "@/components/component/spiner";
import Header from "@/components/component/header";
import Footer from "@/components/component/footer";
import Head from 'next/head';

import axios from 'axios';
import '@/app/globals.css';

const Page: React.FC = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('coin'); // 새로운 상태 추가
  const resultTableRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async (url: string) => {
    setLoading(true);
    const endpoint = activeTab === 'coin' ? '//34.22.90.37:5000/coin' : '//34.22.90.37:5000/stock';
    try {
      const response = await axios.post(endpoint, { video_url: url }, {timeout:1000000});
      let jsonData;
      if (typeof response.data === 'string') {
        jsonData = JSON.parse(response.data.replace(/NaN/g, 'null'));
      } else {
        jsonData = response.data;
      }

      setResults(jsonData.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analysis results:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (results.length > 0 && resultTableRef.current) {
      resultTableRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [results]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Spready - 미국주식/코인 유튜브 분석</title>
        <meta name="description" content="This is an awesome application built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 투자 결정에 도움을 주는 객관적인 데이터를 제공합니다."></meta>
        <meta name="keywords" content="코인, 암호화폐, 유튜브, 투자, 리딩, 사기 방지, 수익률 분석, 투자 도구"></meta>
        <meta name="author" content="당신의 이름 또는 회사명"></meta>
        <meta property="og:title" content="코인 추천 유튜버 분석 도구"></meta>
        <meta property="og:description" content="유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 객관적인 데이터로 현명한 투자 결정을 도와드립니다."></meta>
        <meta property="og:type" content="website"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="코인 추천 유튜버 분석 도구"></meta>
        <meta name="twitter:description" content="유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 객관적인 데이터로 현명한 투자 결정을 도와드립니다."></meta>
        <meta property="og:url" content="https://spready.kr"></meta>
        <meta property="og:image" content="https://spready.kr/main.png"></meta>
        <meta name="twitter:image" content="https://spready.kr/main.png"></meta>
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7656508177587264" crossOrigin="anonymous"></script>
      </Head>
      <Header/>
      <Search onSearch={handleSearch} activeTab={activeTab} setActiveTab={setActiveTab} />
      {loading && (
        <div className="overlay">
          <div className="spinner-container">
            <Spiner />
          </div>
        </div>
      )}
      <div ref={resultTableRef}>
        <ResultTable results={results} loading={loading} />
      </div>
      <Footer/>
    </>
  );
}

export default Page;

