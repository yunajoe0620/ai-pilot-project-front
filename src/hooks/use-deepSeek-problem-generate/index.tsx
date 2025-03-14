import { SetStateAction } from "react";
import { createDeepSeekQuestion } from "../../actions/get-problems";

function useDeepSeekProblemGenerateHandler(
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  setIsProblemGenerate: React.Dispatch<SetStateAction<boolean>>,
  setAIProblemOutput: React.Dispatch<SetStateAction<string>>,
  setAIAnswerOutput: React.Dispatch<SetStateAction<string>>,
  model: string,
  sentPrompt: string
) {
  const handleDeepSeekGenerateProblems = async () => {
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
      const response = await createDeepSeekQuestion(sentPrompt, model);
      // const { status, message, problemPdfresult, answerPdfresult, result } =
      //   response;
      // if (status === 200) {
      //   setIsLoading(false);
      //   setIsProblemGenerate(true);
      //   setProblemPdfFileName(problemPdfresult.filename);
      //   setAnswerPdfFileName(answerPdfresult.filename);
      //   setAIOutput(result.response);
      //   alert(message);
      //   return;
      // }
      // if (status === 400) {
      //   setIsLoading(false);
      //   setIsProblemGenerate(false);
      //   alert(message);
      //   return;
      // }
    } catch (error) {
      throw error;
    }
  };

  return {
    handleDeepSeekGenerateProblems,
  };
}

export default useDeepSeekProblemGenerateHandler;
