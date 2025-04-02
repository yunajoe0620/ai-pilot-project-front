import { useState } from "react";
import styled from "styled-components";
import AIQuizNavigation from "../../components/navigation";

function PdfQuizPage() {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <Layout>
      <Container>
        {/* navigation */}
        <AIQuizNavigation />
        {/* progressedar */}
        <ProgressedBar>
          <ProgressBarContainer>
            <ProgressBarFiller
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </ProgressBarContainer>
          <StepIndicator>{currentStep}/4</StepIndicator>
        </ProgressedBar>

        <Contents></Contents>
      </Container>
    </Layout>
  );
}

export default PdfQuizPage;

const Layout = styled.div`
  min-height: 100vh;
  padding: 56px 60px 119px 60px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div``;

const ProgressedBar = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProgressBarContainer = styled.div`
  display: flex;
  height: 14px;
  padding: 3px 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 9999px;
  background: #f2f5ff;
`;

const ProgressBarFiller = styled.div`
  height: 100%;
  width: 394px;
  border-radius: 9999px;
  background: #7789ff;
  transition: width 0.3s ease-in-out;
`;

const StepIndicator = styled.div`
  text-align: right;
  font-size: 12px;
  line-height: 135%;
  font-weight: 500;
  color: #c8cbd9;
`;
