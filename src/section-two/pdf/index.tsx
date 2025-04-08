import { useState } from "react";
import styled from "styled-components";
import ModalComponent from "../../components/modal/modal-component";
import SubjectRecommendationModal from "../../components/modal/subject-recommendation-modal";
import PageAIQuizNavigation from "../../components/navigation/page-navigation";
import StepFour from "../../components/step/step-four";
import StepFourPartTwo from "../../components/step/step-four-part-two";
import StepOne from "../../components/step/step-one";
import StepThree from "../../components/step/step-three";
import StepTwo from "../../components/step/step-two";
import {
  useStepFourStore,
  useStepOneStore,
  useStepThreeStore,
  useStepTwoStore,
} from "../../store";

function PdfQuizPage() {
  const [currentStep, setCurrentStep] = useState(1);
  // level 1
  const [isGradeDropDown, setIsGradeDropdown] = useState(false);
  const [isSubjectDropDown, setIsSubJectDropdown] = useState(false);

  // level 2
  const [isHighLevelDropdown, setIsHighLevelDropdown] = useState(false);
  const [isMediumLevelDropdown, setIsMediumLevelDropdown] = useState(false);
  const [isLowLevelDropdown, setIsLowLevelDropdown] = useState(false);

  // subject modal
  const [isMajorCurriculumDropdown, setIsMajorCurriculumDropdown] =
    useState(false);

  const [isMediumCurriculumDropdown, setIsMediumCurriculumDropdown] =
    useState(false);

  const [isSubCurriculumDropdown, setIsSubCurriculumDropdown] = useState(false);

  // level 3
  const [isMultipleChoideDropdown, setIsMultipleChoiceDropdown] =
    useState(false);
  const [isShortAnswerDropdown, setIsShortAnswerDropdown] = useState(false);

  // level4

  const [isExtraRequest, setIsExtraRequest] = useState(false);

  const school = useStepOneStore((state) => state.school);
  const grade = useStepOneStore((state) => state.grade);
  const subject = useStepOneStore((state) => state.subject);

  const quizSubject = useStepTwoStore((state) => state.quizSubject);
  const highLevelProblem = useStepTwoStore((state) => state.highLevelProblem);
  const mediumLevelProblem = useStepTwoStore(
    (state) => state.mediumLevelProblem
  );
  const lowLevelProblem = useStepTwoStore((state) => state.lowLevelProblem);

  const multipleChoice = useStepThreeStore((state) => state.multipleChoice);
  const shortAnswer = useStepThreeStore((state) => state.shortAnswer);

  const extraRequest = useStepFourStore((state) => state.extraRequest);

  const majorSubject = useStepTwoStore((state) => state.majorSubject);
  const handleMajorSubject = useStepTwoStore(
    (state) => state.handleMajorSubject
  );

  // step 1일때 버튼
  const handleStepOneGenerate = () => {
    if (!school || !grade || !subject) return;
    setCurrentStep(2);
  };

  // step 2일떄 버튼
  const handleStepTwoGenerate = () => {
    if (!quizSubject) {
      alert("퀴즈 주제를 선택해주세요");
      return;
    }
    if (!highLevelProblem) {
      alert("난이도 상의 문제를 선택해주세요");
      return;
    }
    if (!mediumLevelProblem) {
      alert("난이도 중의 문제를 선택해주세요");
      return;
    }
    if (!lowLevelProblem) {
      alert("난이도 하의 문제를 선택해주세요");
      return;
    }
    if (
      highLevelProblem === "0" &&
      mediumLevelProblem === "0" &&
      lowLevelProblem === "0"
    ) {
      alert("최소 5개 이상의 문제를 선택해주세요");
      return;
    }

    setCurrentStep(3);
  };

  // step 3일떄 버튼튼
  const handleStepThreeGenerate = () => {
    if (!multipleChoice) {
      alert("객관식 문제의 수를 선택해주세요");
      return;
    }
    if (!shortAnswer) {
      alert("주관식 문제의 수를 선택해주세요");
      return;
    }

    setCurrentStep(4);
  };

  // step4
  const handleExtraGenerate = () => {
    if (!extraRequest) {
      alert("추가 요청 사항을 써주세요");
      return;
    }
    setIsExtraRequest(true);
  };

  return (
    <Layout>
      <Container>
        {/* navigation */}
        <PageAIQuizNavigation />
        {/* progressedar  step 3까지만 보인다*/}
        {currentStep <= 3 && (
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
        )}

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
          {currentStep === 3 && (
            <StepThree
              isMultipleChoideDropdown={isMultipleChoideDropdown}
              setIsMultipleChoiceDropdown={setIsMultipleChoiceDropdown}
              isShortAnswerDropdown={isShortAnswerDropdown}
              setIsShortAnswerDropdown={setIsShortAnswerDropdown}
              handleStepThreeGenerate={handleStepThreeGenerate}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 4 && <StepFour isExtraRequest={isExtraRequest} />}
        </Contents>
        {currentStep === 4 && <Line />}
        <Contents>
          {currentStep === 4 && (
            <StepFourPartTwo
              isExtraRequest={isExtraRequest}
              handleExtraGenerate={handleExtraGenerate}
            />
          )}
        </Contents>
      </Container>
      <ModalComponent
        component={
          <SubjectRecommendationModal
            isMajorCurriculumDropdown={isMajorCurriculumDropdown}
            setIsMajorCurriculumDropdown={setIsMajorCurriculumDropdown}
            isMediumCurriculumDropdown={isMediumCurriculumDropdown}
            setIsMediumCurriculumDropdown={setIsMediumCurriculumDropdown}
            isSubCurriculumDropdown={isSubCurriculumDropdown}
            setIsSubCurriculumDropdown={setIsSubCurriculumDropdown}
          />
        }
      ></ModalComponent>
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

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(224, 230, 250, 0.7);
  margin-bottom: 52px;
`;
