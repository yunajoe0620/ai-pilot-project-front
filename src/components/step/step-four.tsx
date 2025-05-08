import styled from "styled-components";
import { baseUrl } from "../../api";
import GenerateButton from "../button/generate-button";

interface StepFourProps {
  isExtraRequest: boolean;
  isExtraGenerateButton: boolean;
  problemHtmlText: string;
  answerHtmlText: string;
}

function StepFour({
  isExtraRequest,
  isExtraGenerateButton,
  problemHtmlText,
  answerHtmlText,
}: StepFourProps) {
  console.log("problemHTMlTExt입니다아아 ====>>>>>>>", problemHtmlText);
  console.log("answerHTMLText입니다아아아아 ===>>>>>>>>>>>>>", answerHtmlText);
  const handlePDFGenerate = async (
    problemHtmlText: string,
    answerHtmlText: string
  ) => {
    if (!problemHtmlText) {
      alert("문제htmlText를 받지를 못했습니다");
      return;
    }
    if (!answerHtmlText) {
      alert("정답htmlText를 받지를 못했습니다");
      return;
    }

    try {
      const url = `${baseUrl}/html/generate`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          problemHtmlText,
          answerHtmlText,
        }),
      });

      // pdf를 다운로드 하는 펑션
      if (response.ok) {
        const problemPDfDownload = fetch(
          `${baseUrl}/pdf/download?type=problem`
        );
        const answerPDfDownload = fetch(`${baseUrl}/pdf/download?type=answer`);

        const [problemResult, answerResult] = await Promise.all([
          problemPDfDownload,
          answerPDfDownload,
        ]);

        if (problemResult.ok) {
          const blob = await problemResult.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = "problem.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        }
        if (answerResult.ok) {
          const blob = await answerResult.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = "answer.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        }
      }
      return {
        status: 400,
        message: "Html파일 저장에 실패하였습니다",
      };
    } catch (error) {
      throw error;
    }
  };
  return (
    <Container>
      <StepFourTopContainer>
        <Character></Character>
        <iframe
          title="html-preview"
          srcDoc={problemHtmlText}
          style={{ width: "100%", height: "500px", border: "none" }}
        />
        <PdfDownLoadContainer>
          <TextOne>
            {isExtraRequest && !isExtraGenerateButton
              ? "AI 퀴즈가 다시 완성되었어요!"
              : "AI 퀴즈가 완성되었어요!"}
          </TextOne>
          <TextTwo>다운로드 버튼을 통해 PDF로 다운 받을 수 있습니다.</TextTwo>
          <GenerateButton
            size="lg"
            color="primary"
            onClick={() => {
              handlePDFGenerate(problemHtmlText, answerHtmlText);
            }}
            active={true}
          >
            {isExtraRequest && !isExtraGenerateButton
              ? "(2차) AI 퀴즈 PDF 다운로드하기"
              : "AI 퀴즈 PDF 다운로드하기"}
          </GenerateButton>
        </PdfDownLoadContainer>
      </StepFourTopContainer>
      {isExtraGenerateButton && <p>2차 AI 퀴즈를 생성중입니다...</p>}
    </Container>
  );
}

export default StepFour;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Character = styled.div`
  width: 110px;
  height: 122px;
  background-color: #7789ff;
  margin-bottom: 40px;
`;
const StepFourTopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const PdfDownLoadContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextOne = styled.p`
  color: #58576e;
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.3px;

  margin-bottom: 8px;
`;

const TextTwo = styled.p`
  color: #9c9ead;
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.21px;
  margin-bottom: 28px;
`;
