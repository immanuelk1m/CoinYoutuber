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

async function wait(ms:any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Page: React.FC = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('coin');
  const resultTableRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async (url: string) => {
    setLoading(true);
    const endpoint = activeTab === 'coin' ? '/api/coin' : '/api/stock';
    try {
      const response = await axios.post(endpoint, { video_url: url }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 300000 
      });
      
      setResults(response.data.results);
    } 
    catch (error) 
    {
      if (axios.isAxiosError(error)) {
        if (error.response) {

          console.error('Error response status:', error.response.status);
          console.error('Error response data:', error.response.data);
        } else if (error.request) {

          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      } else {
        console.error('Error fetching analysis results:', error);
      }
    } finally {
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Spready</title>
        <meta name="description" content="유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 투자 결정에 도움을 주는 객관적인 데이터를 제공합니다." />
        <meta name="keywords" content="코인, 암호화폐, 유튜브, 투자, 리딩, 사기 방지, 수익률 분석, 투자 도구" />
        <meta name="author" content="Spready" />
        <meta property="og:title" content="코인 추천 유튜버 분석 도구" />
        <meta property="og:description" content="유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 객관적인 데이터로 현명한 투자 결정을 도와드립니다." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="코인 추천 유튜버 분석 도구" />
        <meta name="twitter:description" content="유튜브 코인 추천 영상의 실제 수익률을 분석하여 불법 리딩과 사기를 방지하는 도구입니다. 객관적인 데이터로 현명한 투자 결정을 도와드립니다." />
        <meta property="og:url" content="https://spready.kr" />
        <meta property="og:image" content="https://spready.kr/main.png" />
        <meta name="twitter:image" content="https://spready.kr/main.png" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7656508177587264" crossOrigin="anonymous"></script>
      </head>
      <Header />
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
      <Footer />
    </>
  );
}

export default Page;