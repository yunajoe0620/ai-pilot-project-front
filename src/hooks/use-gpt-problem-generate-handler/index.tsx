import { SetStateAction } from "react";
import { createQuestion } from "../../actions/get-problems";

function useGPTProblemGenerateHandler(
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  setIsProblemGenerate: React.Dispatch<SetStateAction<boolean>>,
  setAIProblemOutput: React.Dispatch<SetStateAction<string>>,
  setAIAnswerOutput: React.Dispatch<SetStateAction<string>>,
  model: string,
  sentPrompt: string
) {
  const handleChatGPTGenerateProblems = async () => {
    if (!model) {
      alert("model를 선택해주세요");
      return;
    }
    if (!sentPrompt) {
      alert("prompt를 빈값으로 보낼수 없습니다");
      return;
    }
    if (model === "deepSeekV3" || model === "deepSeekR1") {
      alert("GPT모델만 적용 가능합니다");
      return;
    }
    setIsLoading(true);

    try {
      const response = await createQuestion(sentPrompt, model);
      const { problemDocs, answerDocs, status, message } = response;
      if (status === 200) {
        setIsLoading(false);
        setIsProblemGenerate(true);
        setAIProblemOutput(problemDocs);
        setAIAnswerOutput(answerDocs);
        alert(message);
        return;
      }

      if (status === 400) {
        alert(message);
        return;
      }
    } catch (error) {
      throw error;
    }
  };
  return {
    handleChatGPTGenerateProblems,
  };
}

export default useGPTProblemGenerateHandler;
