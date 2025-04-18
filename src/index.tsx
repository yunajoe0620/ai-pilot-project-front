import { Button } from "@mui/material";
import { baseUrl } from "./api";

function IndexPage() {
  const handleAWolFramAlphaTest = async () => {
    const question = "일차함수 그래프를 그려줘줘";
    try {
      const url = `${baseUrl}/problem/wolfram`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ question }),
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 justify-center h-screen bg-gray-700 text-zinc-100">
      <h1 className="text-6xl text-cente bg-gray-700">파인티쳐 AI PILOT</h1>
      <Button href="/section-analyze" variant="outlined">
        AI 학과 적성 진단 및 직업 추천 예시
      </Button>
      <Button href="/section-two" variant="outlined">
        AI 맞춤형 학습 진행
      </Button>
      <Button href="/test" variant="outlined">
        AI 맞춤형 PROMPT TEST페이지
      </Button>
      <Button href="/" variant="outlined" onClick={handleAWolFramAlphaTest}>
        WolframAlphaAPI 테스트하기
      </Button>
    </div>
  );
}

export default IndexPage;
