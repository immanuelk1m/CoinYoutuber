import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Search({ onSearch }: any) {
  let inputUrl = '';

  const handleChange = (event: any) => {
    inputUrl = event.target.value;
  };

  const handleClick = () => {
    onSearch(inputUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-3xl font-bold text-center">YouTube URL Analyzer</h1>
        <div className="flex items-center bg-muted rounded-full px-4 py-2 space-x-2">
          <Input
            type="text"
            placeholder="Enter YouTube URL here..."
            onChange={handleChange}
            className="flex-1 bg-transparent focus:outline-none"
          />
          <Button onClick={handleClick}>Analyze</Button>
        </div>
      </div>
    </div>
  );
}
