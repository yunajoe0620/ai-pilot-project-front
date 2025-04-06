import { useState } from "react";
import styled from "styled-components";
import PageAIQuizNavigation from "../../components/navigation/page-navigation";
import StepOne from "../../components/step/step-one";
import StepTwo from "../../components/step/step-two";
import { useStepOneStore, useStepTwoStore } from "../../store";

function PdfQuizPage() {
  const [currentStep, setCurrentStep] = useState(1);
  // level 1
  const [isGradeDropDown, setIsGradeDropdown] = useState(false);
  const [isSubjectDropDown, setIsSubJectDropdown] = useState(false);

  // level 2
  // const [highLevelProblem, setHighLevelProblem] = useState("0");
  // const [mediumLevelProblem, setMediumLevelProblem] = useState("0");
  // const [lowLevelProblem, setLowLevelProblem] = useState("0");
  const [isHighLevelDropdown, setIsHighLevelDropdown] = useState(false);
  const [isMediumLevelDropdown, setIsMediumLevelDropdown] = useState(false);
  const [isLowLevelDropdown, setIsLowLevelDropdown] = useState(false);

  const school = useStepOneStore((state) => state.school);
  const grade = useStepOneStore((state) => state.grade);
  const subject = useStepOneStore((state) => state.subject);

  const quizSubject = useStepTwoStore((state) => state.quizSubject);
  const highLevelProblem = useStepTwoStore((state) => state.highLevelProblem);
  const mediumLevelProblem = useStepTwoStore(
    (state) => state.mediumLevelProblem
  );
  const lowLevelProblem = useStepTwoStore((state) => state.mediumLevelProblem);

  // step 1일때 버튼
  const handleStepOneGenerate = () => {
    if (!school || !grade || !subject) return;
    setCurrentStep(2);
  };

  const handleStepTwoGenerate = () => {
    if (!quizSubject) return;
    if (
      highLevelProblem === "0" &&
      mediumLevelProblem === "0" &&
      lowLevelProblem === "0"
    )
      return;
    setCurrentStep(3);
  };

  return (
    <Layout>
      <Container>
        {/* navigation */}
        <PageAIQuizNavigation />
        {/* progressedar */}
        <ProgressedBar>
          <Quiztitle>PDF 형식 퀴즈 만들기</Quiztitle>
          <ProgressBarContainer>
            <ProgressBarFillerContainer>
              <ProgressBarFiller
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </ProgressBarFillerContainer>
            <StepIndicator>{currentStep}/4</StepIndicator>
          </ProgressBarContainer>
        </ProgressedBar>

        {/* step별로 바뀌는 부분이다  */}
        <Contents>
          {currentStep === 1 && (
            <StepOne
              isGradeDropDown={isGradeDropDown}
              setIsGradeDropdown={setIsGradeDropdown}
              isSubjectDropDown={isSubjectDropDown}
              setIsSubJectDropdown={setIsSubJectDropdown}
              handleStepOneGenerate={handleStepOneGenerate}
            />
          )}
          {currentStep === 2 && (
            <StepTwo
              isHighLevelDropdown={isHighLevelDropdown}
              setIsHighLevelDropdown={setIsHighLevelDropdown}
              isMediumLevelDropdown={isMediumLevelDropdown}
              setIsMediumLevelDropdown={setIsMediumLevelDropdown}
              isLowLevelDropdown={isLowLevelDropdown}
              setIsLowLevelDropdown={setIsLowLevelDropdown}
              handleStepTwoGenerate={handleStepTwoGenerate}
              setCurrentStep={setCurrentStep}
            />
          )}
        </Contents>
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
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: center;
  align-items: center;
`;

const ProgressedBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  row-gap: 6px;
`;

const Quiztitle = styled.p`
  color: #58576e;
  font-family: "NEXON Lv2 Gothic";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%; /* 21.6px */
  letter-spacing: -0.24px;
  display: flex;
  padding: 8px 4px;
  align-items: center;
  align-self: stretch;
`;

const ProgressBarContainer = styled.div`
  margin-bottom: 44px;
`;
const ProgressBarFillerContainer = styled.div`
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
  display: flex;
  padding: 9px 4px;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
  color: #aeaebf;
  text-align: right;
  font-family: "NEXON Lv2 Gothic";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.18px;
`;

const SchoolGradeContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 60px;
  width: 100%;
`;

const Subtitle = styled.p`
  color: #58576e;
  font-family: "NEXON Lv2 Gothic";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 21.6px */
  letter-spacing: -0.24px;
`;

const GradeDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 16px;
`;

// 과목

const SubjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  margin-bottom: 70px;
`;
