import { SetStateAction } from "react";
import {
  createDeekSeekExtraQuestion,
  createDeepSeekQuestion,
} from "../../actions/get-problems";
import { Level, ProblemType } from "../../type";

function useDeepSeekProblemGenerateHandler(
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
  setIsProblemGenerate: React.Dispatch<SetStateAction<boolean>>,
  setPdfFileName: React.Dispatch<SetStateAction<string>>,
  target: string,
  subject: string,
  theme: string,
  level: Level,
  problemType: ProblemType,
  problemCount: number,
  newTopic: string
) {
  const handleDeepSeekGenerateProblems = async () => {
    setIsLoading(true);

    if (newTopic.length === 0) {
      try {
        const response = await createDeepSeekQuestion({
          target,
          subject,
          theme,
          level,
          problemType,
          problemCount,
        });
        if (response.status === 200) {
          setIsLoading(false);
          setIsProblemGenerate(true);
          const { filename } = response.pdfresult;
          setPdfFileName(filename);
        }
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const response = await createDeekSeekExtraQuestion({
          target,
          subject,
          theme: newTopic,
          level,
          problemType,
          problemCount,
        });
        if (response.status === 200) {
          setIsLoading(false);
          setIsProblemGenerate(true);
          const { filename } = response.pdfresult;
          setPdfFileName(filename);
        }
      } catch (error) {
        throw error;
      }
    }
  };
  return {
    handleDeepSeekGenerateProblems,
  };
}

export default useDeepSeekProblemGenerateHandler;
