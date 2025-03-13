import { SetStateAction } from "react";
import { createDeepSeekQuestion } from "../../actions/get-problems";

function useDeepSeekProblemGenerateHandler(
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  setIsProblemGenerate: React.Dispatch<SetStateAction<boolean>>,
  setProblemPdfFileName: React.Dispatch<SetStateAction<string>>,
  setAnswerPdfFileName: React.Dispatch<SetStateAction<string>>,
  setAIOutput: React.Dispatch<SetStateAction<string>>,
  model: string,
  newTopic: string,
  sentPrompt: string
) {
  const handleDeepSeekGenerateProblems = async () => {
    setIsLoading(true);
    if (model === "gpt40Mini" || model === "gpt40") {
      alert("DeepSeek MODEL만 적용이 가능합니다");
      return;
    }

    try {
      const response = await createDeepSeekQuestion(sentPrompt, model);
      const { status, message, problemPdfresult, answerPdfresult, result } =
        response;
      if (status === 200) {
        setIsLoading(false);
        setIsProblemGenerate(true);
        setProblemPdfFileName(problemPdfresult.filename);
        setAnswerPdfFileName(answerPdfresult.filename);
        setAIOutput(result.response);
        alert(message);
        return;
      }
      if (status === 400) {
        setIsLoading(false);
        setIsProblemGenerate(false);
        alert(message);
        return;
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    handleDeepSeekGenerateProblems,
  };
}

export default useDeepSeekProblemGenerateHandler;
