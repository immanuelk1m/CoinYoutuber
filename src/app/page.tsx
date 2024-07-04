"use client";

import React, { useState, useRef, useEffect } from 'react';
import Search from "@/components/component/search";
import ResultTable from "@/components/component/result-table";
import Spiner from "@/components/component/spiner";
import axios from 'axios';
import '@/app/globals.css';

const Page: React.FC = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const resultTableRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/analyze', { video_url: url });
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
      <Search onSearch={handleSearch} />
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
  );
}

export default Page;
