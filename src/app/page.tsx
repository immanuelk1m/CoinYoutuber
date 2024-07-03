"use client";

import React, { useState } from 'react';
import Search from "@/components/component/search";
import ResultTable from "@/components/component/result-table";
import axios from 'axios';

function Page() {
  const [results, setResults] = useState([]);

  const handleSearch = async (url : any) => 
    {
    try 
    {
      const response = await axios.post('http://localhost:5000/analyze', { video_url: url });
      console.log(response.data);
      let jsonData;
      if (typeof response.data === 'string') 
      {
          jsonData = JSON.parse(response.data.replace(/NaN/g, 'null'));
      } 
      else 
      {
          jsonData = response.data;
      }
      console.log(jsonData.results);

      if (jsonData && jsonData.results) 
      {
        
          setResults(jsonData.results); 
      } 
      
    } 
    catch (error) {
      console.error('Error fetching analysis results:', error);
    }
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <ResultTable results={results} />
    </div>
  );
}

export default Page;
