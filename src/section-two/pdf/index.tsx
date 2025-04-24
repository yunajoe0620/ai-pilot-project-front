import { useState } from "react";
import styled from "styled-components";
import { createPdf } from "../../actions/get-pdf";
import { createQuestion } from "../../actions/get-problems";
import { baseUrl } from "../../api";
import ModalComponent from "../../components/modal/modal-component";
import SubjectRecommendationModal from "../../components/modal/subject-recommendation-modal";
import PageAIQuizNavigation from "../../components/navigation/page-navigation";
import StepFour from "../../components/step/step-four";
import StepFourPartTwo from "../../components/step/step-four-part-two";
import StepOne from "../../components/step/step-one";
import StepThree from "../../components/step/step-three";
import StepTwo from "../../components/step/step-two";
import useDropDownClose from "../../hooks/use-dropdown-close";
import {
  useStepFourStore,
  useStepOneStore,
  useStepThreeStore,
  useStepTwoStore,
} from "../../store";
import { newFormatQuestion } from "../../utils/section-two";

function PdfQuizPage() {
  const [currentStep, setCurrentStep] = useState(1);
  // level 1
  const [isGradeDropDown, setIsGradeDropdown] = useState(false);
  const [isSubjectDropDown, setIsSubJectDropdown] = useState(false);
  const [tempSchool, setTempSchool] = useState("");
  const [tempGrade, setTempGrade] = useState("");
  const [tempSubject, setTempSubject] = useState("");
  const [isReset, setIsReset] = useState(false);

  // level 2
  const [isHighLevelDropdown, setIsHighLevelDropdown] = useState(false);
  const [isMediumLevelDropdown, setIsMediumLevelDropdown] = useState(false);
  const [isLowLevelDropdown, setIsLowLevelDropdown] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMajorCurriculumDropdown, setIsMajorCurriculumDropdown] =
    useState(false);

  const [isMediumCurriculumDropdown, setIsMediumCurriculumDropdown] =
    useState(false);

  const [isSubCurriculumDropdown, setIsSubCurriculumDropdown] = useState(false);

  // level 3
  const [isMultipleChoideDropdown, setIsMultipleChoiceDropdown] =
    useState(false);
  const [isShortAnswerDropdown, setIsShortAnswerDropdown] = useState(false);
  const [isGenerateButton, setIsGenerateButton] = useState(false);
  const [isAIGeneratorError, setIsAIGeneratorError] = useState(false);

  // level4

  const [isExtraRequest, setIsExtraRequest] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [pdfProblemFileName, setPdfProblemFileName] = useState("");
  const [pdfAnswerFileName, setPdfAnswerFileName] = useState("");
  const [isExtraGenerateButton, setIsExtraGenerateButton] = useState(false);
  const [problemHtmlText, setProblemHtmlText] = useState("");
  const [answerHtmlText, setAnswerHtmlText] = useState("");

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

  const handleSchool = useStepOneStore((state) => state.handleSchool);
  const handleGrade = useStepOneStore((state) => state.handleGrade);

  const handleSubject = useStepOneStore((state) => state.handleSubject);

  useDropDownClose({
    isDropdownOne: isHighLevelDropdown,
    setIsDropdownOne: setIsHighLevelDropdown,
    isDropdownTwo: isMediumLevelDropdown,
    setIsDropdownTwo: setIsMediumLevelDropdown,
    isDropdownThree: isLowLevelDropdown,
    setIsDropdownThree: setIsLowLevelDropdown,
  });

  useDropDownClose({
    isDropdownOne: isMajorCurriculumDropdown,
    setIsDropdownOne: setIsMajorCurriculumDropdown,
    isDropdownTwo: isMediumCurriculumDropdown,
    setIsDropdownTwo: setIsMediumCurriculumDropdown,
    isDropdownThree: isSubCurriculumDropdown,
    setIsDropdownThree: setIsSubCurriculumDropdown,
  });

  // step 1일때 버튼
  const handleStepOneGenerate = () => {
    if (!tempSchool) {
      alert("학교를 선택해주세요");
      return;
    }
    if (!tempGrade) {
      alert("학년를 선택해주세요");
      return;
    }
    if (!tempSubject) {
      alert("과목을 선택해주세요");
      return;
    }

    // 퀴즈 주제 선정하기 버튼을 누를때 저장
    handleSchool(tempSchool);
    handleGrade(tempGrade);
    handleSubject(tempSubject);

    // 현재 선택한 학교랑 저장되어 있는 학교랑 다르면은은
    if (school) {
      if (tempSchool !== school) {
        setIsReset(true);
      }
    }
    if (grade) {
      if (tempGrade !== grade) {
        setIsReset(true);
      }
    }

    if (subject) {
      if (tempSubject !== subject) {
        setIsReset(true);
      }
    }

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

  // step 3일떄 버튼
  // API 부르기

  const handleStepThreeGenerate = async () => {
    setIsGenerateButton(true);
    setIsAIGeneratorError(false);
    if (!multipleChoice) {
      alert("객관식 문제의 수를 선택해주세요");
      return;
    }
    if (!shortAnswer) {
      alert("주관식 문제의 수를 선택해주세요");
      return;
    }

    try {
      const url = `${baseUrl}/problem/test`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          school,
          grade,
          subject,
          quizSubject,
          multipleChoice,
          shortAnswer,
          highLevelProblem,
          mediumLevelProblem,
          lowLevelProblem,
        }),
      });
      const jsonData = await response.json();

      const { status, problemfilename, problemDocs, answerDocs } = jsonData;

      if (status === 200) {
        setPdfProblemFileName(problemfilename);
        setCurrentStep(4);
        const result1 = await createPdf(problemDocs, answerDocs);
        const { status, problemPdfresult, answerPdfresult } = result1;
        if (status === 200) {
          setPdfProblemFileName(problemPdfresult.filename);
          setPdfAnswerFileName(answerPdfresult.filename);
          setCurrentStep(4);
        } else {
          setIsAIGeneratorError(true);
          setIsGenerateButton(false);
        }
      } else {
        setIsAIGeneratorError(true);
        setIsGenerateButton(false);
      }
    } catch (error) {
      throw error;
    }

    setIsGenerateButton(false);
  };

  // step4
  const handleExtraGenerate = async () => {
    setIsExtraGenerateButton(true);
    if (!extraRequest) {
      alert("추가 요청 사항을 써주세요");
      return;
    }
    setIsExtraRequest(true);
    setShowSetting(true);

    const prompt = newFormatQuestion(
      school,
      grade,
      subject,
      quizSubject,
      highLevelProblem,
      mediumLevelProblem,
      lowLevelProblem,
      multipleChoice,
      shortAnswer,
      extraRequest
    );

    try {
      const response = await createQuestion(prompt, "gpt40");
      const { problemDocs, answerDocs, status } = response;
      if (status === 200) {
        const result1 = await createPdf(problemDocs, answerDocs);
        const { status, problemPdfresult, answerPdfresult } = result1;
        if (status === 200) {
          setPdfProblemFileName(problemPdfresult.filename);
          setPdfAnswerFileName(answerPdfresult.filename);
          setIsExtraGenerateButton(false);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  // whoframAlphaTest
  const handleAWolFramAlphaTest = async () => {
    setIsGenerateButton(true);
    setIsAIGeneratorError(false);
    if (!multipleChoice) {
      alert("객관식 문제의 수를 선택해주세요");
      return;
    }
    if (!shortAnswer) {
      alert("주관식 문제의 수를 선택해주세요");
      return;
    }
    try {
      const url = `${baseUrl}/problem/wolfram`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          school,
          grade,
          subject,
          quizSubject,
          multipleChoice,
          shortAnswer,
        }),
      });
      const jsonData = await response.json();
    } catch (error) {
      throw error;
    }
  };

  // gemini
  const handleGeminiProblem = async () => {
    setIsGenerateButton(true);
    setIsAIGeneratorError(false);
    if (!multipleChoice) {
      alert("객관식 문제의 수를 선택해주세요");
      return;
    }
    if (!shortAnswer) {
      alert("주관식 문제의 수를 선택해주세요");
      return;
    }

    try {
      const url = `${baseUrl}/problem/generate/gemini`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // 내가 보내는 데이터의 형식이 뭔지를 서버
          "Content-Type": "application/json",
          // 내가 받고 싶은 응답 형식을 서버에 요청
          Accept: "application/json",
        },
        body: JSON.stringify({
          school,
          grade,
          subject,
          quizSubject,
          multipleChoice,
          shortAnswer,
          highLevelProblem,
          mediumLevelProblem,
          lowLevelProblem,
        }),
      });

      const jsonData = await response.json();

      if (jsonData.status === 200) {
        setCurrentStep(4);
        setProblemHtmlText(jsonData.cleanedproblemHtml);
        setAnswerHtmlText(jsonData.cleanedanswerHtml);
      } else {
        setIsAIGeneratorError(true);
        setIsGenerateButton(false);
      }
    } catch (error) {
      throw error;
    }

    setIsGenerateButton(false);
  };

  return (
    <Layout>
      <Container>
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
              tempSchool={tempSchool}
              tempGrade={tempGrade}
              tempSubject={tempSubject}
              setTempSchool={setTempSchool}
              setTempGrade={setTempGrade}
              setTempSubject={setTempSubject}
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
              setIsModalOpen={setIsModalOpen}
              isReset={isReset}
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
              isGenerateButton={isGenerateButton}
              isAIGeneratorError={isAIGeneratorError}
              // for WolframAlphText
              handleAWolFramAlphaTest={handleAWolFramAlphaTest}
              // for Gemini
              handleGeminiProblem={handleGeminiProblem}
            />
          )}
          {currentStep === 4 && (
            <StepFour
              isExtraRequest={isExtraRequest}
              pdfProblemFileName={pdfProblemFileName}
              pdfAnswerFileName={pdfAnswerFileName}
              isExtraGenerateButton={isExtraGenerateButton}
              // for htmlText
              problemHtmlText={problemHtmlText}
              answerHtmlText={answerHtmlText}
            />
          )}
        </Contents>
        {currentStep === 4 && <Line />}
        <Contents>
          {currentStep === 4 && (
            <StepFourPartTwo
              isExtraRequest={isExtraRequest}
              handleExtraGenerate={handleExtraGenerate}
              showSetting={showSetting}
              setShowSetting={setShowSetting}
            />
          )}
        </Contents>
      </Container>
      {isModalOpen && (
        <ModalComponent
          component={
            <SubjectRecommendationModal
              isMajorCurriculumDropdown={isMajorCurriculumDropdown}
              setIsMajorCurriculumDropdown={setIsMajorCurriculumDropdown}
              isMediumCurriculumDropdown={isMediumCurriculumDropdown}
              setIsMediumCurriculumDropdown={setIsMediumCurriculumDropdown}
              isSubCurriculumDropdown={isSubCurriculumDropdown}
              setIsSubCurriculumDropdown={setIsSubCurriculumDropdown}
              setIsModalOpen={setIsModalOpen}
              isReset={isReset}
              setIsReset={setIsReset}
            />
          }
        ></ModalComponent>
      )}
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
