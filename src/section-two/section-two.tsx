import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AIQuizNavigation from "../components/navigation";

function SectionTwo() {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState("");
  return (
    <Layout>
      <Container>
        <AIQuizNavigation />
        <Contents>
          <QuizTypeContainer>
            <QuizType>
              <img src="src/assets/flash-card.svg" width="146" height="146" />
              <Button selected={selectedButton === "플래쉬 카드 퀴즈"}>
                플래쉬 카드 퀴즈
              </Button>
            </QuizType>
            <QuizType>
              <img src="src/assets/ppt.svg" width="146" height="146" />
              <Button selected={selectedButton === "PPT형식 퀴즈"}>
                유사문제 퀴즈
              </Button>
            </QuizType>
            <QuizType
              role="button"
              onClick={() => {
                setSelectedButton("PDF 형식 퀴즈");
                navigate("/section-two/pdf");
              }}
            >
              <img src="src/assets/pdf.svg" width="146" height="146" />
              <Button selected={selectedButton === "PDF 형식 퀴즈"}>
                PDF 형식 퀴즈
              </Button>
            </QuizType>
          </QuizTypeContainer>
          <img src="src/assets/ai-quiz-letter-two.svg" />
        </Contents>
      </Container>
    </Layout>
  );
}

export default SectionTwo;

const Layout = styled.div`
  min-height: 100vh;
  padding: 56px 60px 143px 60px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 196px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 100px;
  align-items: center;
`;

const QuizTypeContainer = styled.div`
  display: flex;
  column-gap: 36px;
`;
const QuizType = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  cursor: pointer;
`;

const Button = styled.button<{ selected: boolean }>`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 999999px;
  border: 2px solid #e0e6fa;
  background: #fff;
  background: ${({ selected }) => (selected ? "#7789ff" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : " #8e8e96")};
  cursor: pointer;
`;
