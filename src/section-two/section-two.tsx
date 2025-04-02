import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AIQuizNavigation from "../components/navigation";

function SectionTwo() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Container>
        <AIQuizNavigation />

        {/* body부분 */}
        <Contents>
          {/* quiz type 클릭하는 부분 */}
          <QuizTypeContainer>
            <QuizType>
              <img src="src/assets/flash-card.svg" />
              <Button>플래쉬 카드 퀴즈</Button>
            </QuizType>
            <QuizType>
              <img src="src/assets/ppt.svg" />
              <Button>PPT형식 퀴즈</Button>
            </QuizType>
            <QuizType>
              <img src="src/assets/pdf.svg" />
              <Button
                onClick={() => {
                  navigate("/section-two/pdf");
                }}
              >
                PDF 형식 퀴즈
              </Button>
            </QuizType>
            <QuizType>
              <img src="src/assets/teacher.svg" />
              <Button>선생님용 퀴즈</Button>
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

// Body Container

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
`;

const Button = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 999999px;
  border: 2px solid #e0e6fa;
  background: #fff;
  cursor: pointer;
`;
