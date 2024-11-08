'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import "@/styles/fonts.css";

export default function Search({ onSearch, activeTab, setActiveTab }: { 
  onSearch: (url: string) => void, 
  activeTab: string, 
  setActiveTab: (tab: string) => void 
}) {
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value); 
  };

  const handleClick = () => {
    setIsLoading(true);
    onSearch(inputUrl);
    setInputUrl('');
    setTimeout(() => setIsLoading(false), 3000); // 로딩 효과를 위한 예시
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold mb-8 font-pretendard">이제는 유튜브 분석으로 꼼꼼히 투자!!</h1>

          <p className="text-sm text-gray-800 font-pretendard">
            수많은 유튜브 정보 속에서 아직도 헤매고 계신가요? 🤔
            <br />
            코인과 미국주식 추천 유튜브 영상을 분석해 드립니다! 🎥💡
            <br />
            영상이 업로드된 일자를 기준으로 3일, 1주일, 2주일 동안의 
            <br />
            수익률 성과를 한눈에 확인해 보세요! 📈💰
          </p>
        </div>

        {/* 탭과 전환 애니메이션 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="coin" 
              className={`${activeTab === 'coin' ? 'bg-gray-100' : 'bg-white'} transition-colors duration-300 ease-in-out border-b-2 ${activeTab === 'coin' ? 'border-red-500' : 'border-transparent'}`}
            >
              🪙 코인
            </TabsTrigger>
            <TabsTrigger 
              value="stock" 
              className={`${activeTab === 'stock' ? 'bg-gray-100' : 'bg-white'} transition-colors duration-300 ease-in-out border-b-2 ${activeTab === 'stock' ? 'border-red-500' : 'border-transparent'}`}
            >
              📈 미국주식
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* URL 입력 및 분석 버튼 */}
        <div className="flex items-center bg-muted rounded-full px-4 py-2 space-x-2">
          <Input
            type="text"
            placeholder="유튜브 영상 링크를 입력해주세요..."
            value={inputUrl}
            onChange={handleChange}
            className="flex-1 bg-transparent focus:outline-none"
          />
          <button 
            onClick={handleClick} 
            disabled={isLoading || inputUrl === ''} 
            className={`flex items-center bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
            ) : (
              <span>분석하기</span>
            )}
          </button>
        </div>

        {/* 로딩 메시지 및 조건 설명 */}
        <div className="text-sm text-center text-gray-500 space-y-1 font-pretendard mt-4">
          <p>분석에 30초에서 1분정도 소요됩니다 ⏱️</p>
          <p>서버 안정화를 위해 분석은 하루 검색 3회로 제한됩니다 🧐</p>
          <p>최근 한 달 내의 영상 분석이 진행됩니다 📅</p>
        </div>
      </div>
    </div>
  );
}
