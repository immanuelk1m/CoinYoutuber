import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Search({ onSearch, activeTab, setActiveTab }: { 
  onSearch: (url: string) => void, 
  activeTab: string, 
  setActiveTab: (tab: string) => void 
}) {
  let inputUrl = '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputUrl = event.target.value;
  };

  const handleClick = () => {
    onSearch(inputUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold mb-8">🚀 투자, 이제 유튜브 영상 분석으로! 📊</h1>
          <p className="text-sm text-gray-600">
            복잡한 차트와 수많은 정보 속에서 헤매고 계신가요? 🤔
            <br />
            코인과 미국주식 추천 유튜브 영상을 분석해 드립니다! 🎥💡
            <br />
            영상이 업로드된 일자를 기준으로 3일, 1주일, 2주일 동안의 
            <br />
            수익률 성과를 한눈에 확인해 보세요! 📈💰
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="coin">🪙코인 분석</TabsTrigger>
            <TabsTrigger value="stock">📈미국주식</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center bg-muted rounded-full px-4 py-2 space-x-2">
          <Input
            type="text"
            placeholder="유튜브 영상 링크를 입력해주세요..."
            onChange={handleChange}
            className="flex-1 bg-transparent focus:outline-none"
          />
          <Button onClick={handleClick} className="bg-red-500 hover:bg-red-600 text-white">
            분석하기
          </Button>
        </div>
        <div className="text-sm text-center text-gray-500 space-y-1">
          <p>서버 안정화를 위해 분석은 하루 검색 3회로 제한됩니다 ⏱️</p>
          <p>최근 한 달 내의 영상 분석이 진행됩니다 📅</p>
        </div>
      </div>
    </div>
  );
}