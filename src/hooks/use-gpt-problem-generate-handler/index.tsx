import { SetStateAction } from "react";
import { createQuestion } from "../../actions/get-problems";

function useGPTProblemGenerateHandler(
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  setIsProblemGenerate: React.Dispatch<SetStateAction<boolean>>,
  setProblemPdfFileName: React.Dispatch<SetStateAction<string>>,
  setAnswerPdfFileName: React.Dispatch<SetStateAction<string>>,
  setAIOutput: React.Dispatch<SetStateAction<string>>,
  model: string,
  newTopic: string,
  sentPrompt: string
) {
  const handleChatGPTGenerateProblems = async () => {
    if (model === "deepSeekV3" || model === "deepSeekR1") {
      alert("GPT MODEL만 적용이 가능합니다");
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
