"use client";

import React, { useState, useRef, useEffect } from 'react';
import Search from "@/components/component/search";
import ResultTable from "@/components/component/result-table";
import Spiner from "@/components/component/spiner";
import Header from "@/components/component/header";
import Footer from "@/components/component/footer";
import AdsenseOnfooter from "@/components/component/adsenseft";

import axios from 'axios';

import '@/app/globals.css';

const Page: React.FC = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('coin');
  const resultTableRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async (url: string) => {
    setLoading(true);
    const endpoint = activeTab === 'coin' ? '/api/coin' : '/api/stock';
    
    try {
      const response = await axios.post(endpoint, 
        { channel_url: url }, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 300000
        }
      );
      
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
      <Header />
      <div className="content-container">
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
      </div>

      <div className="justify-center" style={{ height: '180px' }}>
        <div>
          <AdsenseOnfooter/>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Page;