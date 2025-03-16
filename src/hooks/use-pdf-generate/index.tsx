import { SetStateAction } from "react";
import { createPdf } from "../../actions/get-pdf";

function usePDFGenerateHandler(
  setPdfLoading: React.Dispatch<SetStateAction<boolean>>,
  setProblemPdfFileName: React.Dispatch<SetStateAction<string>>,
  setAnswerPdfFileName: React.Dispatch<SetStateAction<string>>,
  setPdfGenerateStatus: React.Dispatch<SetStateAction<number>>,
  setPdfGenerateMessage: React.Dispatch<SetStateAction<string>>
) {
  const handlePDFGenerate = async (
    AIProblemOutput: string,
    AIAnswerOutput: string
  ) => {
    try {
      setPdfLoading(true);

      const result = await createPdf(AIProblemOutput, AIAnswerOutput);
      if (result.status === 200) {
        setPdfLoading(false);
        setPdfGenerateStatus(result.status);
        setPdfGenerateMessage(result.message);
        setProblemPdfFileName(result.problemPdfresult.filename);
        setAnswerPdfFileName(result.answerPdfresult.filename);
        return;
      }
      if (result.status === 400) {
        setPdfLoading(false);
        setPdfGenerateStatus(result.status);

        setPdfGenerateMessage(result.message);
        return;
      }
    } catch (error) {
      setPdfLoading(false);
      throw error;
    }
  };

  return {
    handlePDFGenerate,
  };
}

export default usePDFGenerateHandler;
