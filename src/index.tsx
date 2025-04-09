import { Button } from "@mui/material";

function IndexPage() {
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
    </div>
  );
}

export default IndexPage;
