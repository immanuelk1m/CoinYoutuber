"use client";

import React, { useState, useRef, useEffect } from 'react';
import Search from "@/components/component/search";
import ResultTable from "@/components/component/result-table";
import Spiner from "@/components/component/spiner";
import Header from "@/components/component/header";
import Footer from "@/components/component/footer";

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
    <div>
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
    </div>
  );
}

export default Page;