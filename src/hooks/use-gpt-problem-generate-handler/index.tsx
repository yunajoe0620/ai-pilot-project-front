import { SetStateAction } from "react";
import {
  createExtraQuestion,
  createQuestion,
} from "../../actions/get-problems";
import { Level, ProblemType } from "../../type";

function useGPTProblemGenerateHandler(
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  setIsProblemGenerate: React.Dispatch<SetStateAction<boolean>>,
  setProblemPdfFileName: React.Dispatch<SetStateAction<string>>,
  setAnswerPdfFileName: React.Dispatch<SetStateAction<string>>,
  target: string,
  subject: string,
  theme: string,
  level: Level,
  problemType: ProblemType,
  problemCount: number,
  newTopic: string
) {
  const handleChatGPTGenerateProblems = async () => {
    setIsLoading(true);

    if (newTopic.length === 0) {
      try {
        const response = await createQuestion({
          target,
          subject,
          theme,
          level,
          problemType,
          problemCount,
        });
        const { status, message, problemPdfresult, answerPdfresult } = response;
        if (status === 200) {
          setIsLoading(false);
          setIsProblemGenerate(true);
          setProblemPdfFileName(problemPdfresult.filename);
          setAnswerPdfFileName(answerPdfresult.filename);
          alert(message);
          return;
        }
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const response = await createExtraQuestion({
          target,
          subject,
          theme: newTopic,
          level,
          problemType,
          problemCount,
        });
        const { status, message, problemPdfresult, answerPdfresult } = response;
        if (status === 200) {
          setIsLoading(false);
          setIsProblemGenerate(true);
          setProblemPdfFileName(problemPdfresult.filename);
          setAnswerPdfFileName(answerPdfresult.filename);
          alert(message);
          return;
        }
      } catch (error) {
        throw error;
      }
    }
  };
  return {
    handleChatGPTGenerateProblems,
  };
}

export default useGPTProblemGenerateHandler;
