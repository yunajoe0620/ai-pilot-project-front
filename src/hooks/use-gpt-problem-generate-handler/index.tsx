import { SetStateAction } from "react";
import { createQuestion } from "../../actions/get-problems";

function useGPTProblemGenerateHandler(
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  setIsProblemGenerate: React.Dispatch<SetStateAction<boolean>>,
  setProblemPdfFileName: React.Dispatch<SetStateAction<string>>,
  setAnswerPdfFileName: React.Dispatch<SetStateAction<string>>,
  setAIOutput: React.Dispatch<SetStateAction<string>>,
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
    if (model === "gpt40Mini" || model === "gpt40") {
      alert("DeepSeek MODEL만 적용이 가능합니다");
      return;
    }
    setIsLoading(true);

    try {
      const response = await createQuestion(sentPrompt, model);
      const { status, message, problemPdfresult, answerPdfresult, result } =
        response;

      if (status === 200) {
        setIsLoading(false);
        setIsProblemGenerate(true);
        setProblemPdfFileName(problemPdfresult.filename);
        setAnswerPdfFileName(answerPdfresult.filename);
        setAIOutput(result.response);
        alert(message);
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
