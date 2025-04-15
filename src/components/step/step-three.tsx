import { useEffect } from "react";
import styled from "styled-components";
import { useStepThreeStore, useStepTwoStore } from "../../store";
import { problemsArray } from "../../utils/dropdown";
import GenerateButton from "../button/generate-button";
import SingleDropdown from "../dropdown/single-dropdown";
interface StepThreeProps {
  isMultipleChoideDropdown: boolean;
  setIsMultipleChoiceDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isShortAnswerDropdown: boolean;
  setIsShortAnswerDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepThreeGenerate: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isGenerateButton: boolean;
  isAIGeneratorError: boolean;
  setIsAIGeneratorError: React.Dispatch<React.SetStateAction<boolean>>;
}

// max 60 문항
function StepThree({
  isMultipleChoideDropdown,
  setIsMultipleChoiceDropdown,
  isShortAnswerDropdown,
  setIsShortAnswerDropdown,
  handleStepThreeGenerate,
  setCurrentStep,
  isGenerateButton,
  isAIGeneratorError,
  setIsAIGeneratorError,
}: StepThreeProps) {
  const totalProblem = useStepTwoStore((state) => state.totalProblem);
  const multipleChoice = useStepThreeStore((state) => state.multipleChoice);
  const handleMultipleChoice = useStepThreeStore(
    (state) => state.handleMultipleChoice
  );

  const shortAnswer = useStepThreeStore((state) => state.shortAnswer);
  const handleShortAnswerProblem = useStepThreeStore(
    (state) => state.handleShortAnswerProblem
  );

  console.log("isAIGenerator", isAIGeneratorError);

  // 빈문자열을 Number("") typecasing하면은 0 이 된다.
  useEffect(() => {
    if (multipleChoice !== "") {
      if (totalProblem > 0 && Number(multipleChoice) >= 0) {
        let calSubjectProblems = totalProblem - Number(multipleChoice);
        handleShortAnswerProblem(calSubjectProblems);
      }
    }
  }, [totalProblem, multipleChoice]);

  useEffect(() => {
    if (shortAnswer !== "") {
      if (totalProblem > 0 && Number(shortAnswer) >= 0) {
        let calSubjectProblems = totalProblem - Number(shortAnswer);
        handleMultipleChoice(calSubjectProblems);
      }
    }
  }, [totalProblem, shortAnswer]);

  return (
    <QuizTypeContainer>
      <Subtitle>퀴즈의 유형을 정해주세요.</Subtitle>
      <DropDownContainer>
        <QuizTypeDropdownContainer>
          <QuizTypeText>객관식 문제</QuizTypeText>
          <SingleDropdown
            placeholder="문항 수를 선택해 주세요."
            size="lg"
            isDropdown={isMultipleChoideDropdown}
            setIsDropdown={setIsMultipleChoiceDropdown}
            itemArray={problemsArray}
            itemKey="multlpleChoice"
            selectedValue={multipleChoice}
            handleDropdown={(e: React.MouseEvent<HTMLDivElement>) => {
              //  왜 false일까유?
              // console.log("typeofe", e instanceof HTMLElement);
              let value = e.target as HTMLElement;
              let selectedMultipleChoice = value.textContent as string;
              if (Number(selectedMultipleChoice) > totalProblem) {
                alert("총 문제보다 문제수가 클 수는 없습니다");
                return;
              }

              handleMultipleChoice(e);
            }}
          />
        </QuizTypeDropdownContainer>
        <QuizTypeDropdownContainer>
          <QuizTypeText>주관식 문제</QuizTypeText>
          <SingleDropdown
            placeholder="문항 수를 선택해 주세요."
            size="lg"
            isDropdown={isShortAnswerDropdown}
            setIsDropdown={setIsShortAnswerDropdown}
            itemArray={problemsArray}
            itemKey="shortAnswer"
            selectedValue={shortAnswer}
            handleDropdown={(e: React.MouseEvent<HTMLDivElement>) => {
              let value = e.target as HTMLElement;
              let selectedShortAnswer = value.textContent as string;
              if (Number(selectedShortAnswer) > totalProblem) {
                alert("총 문제보다 문제수가 클 수는 없습니다");
                return;
              }
              handleShortAnswerProblem(e);
            }}
          />
        </QuizTypeDropdownContainer>
      </DropDownContainer>
      <ButtonContainer>
        <GenerateButton
          size="sm"
          color="default"
          onClick={() => {
            setCurrentStep(2);
          }}
          active={false}
        >
          이전 설정보기
        </GenerateButton>
        <GenerateButton
          size="md"
          color="primary"
          onClick={handleStepThreeGenerate}
          active={!multipleChoice || !shortAnswer ? false : true}
        >
          AI 퀴즈 생성하기
        </GenerateButton>
      </ButtonContainer>
      {isGenerateButton && <p>AI 퀴즈를 생성 중입니다....</p>}
      {isAIGeneratorError && <p>AI문제생성에 실패하였습니다</p>}
    </QuizTypeContainer>
  );
}

export default StepThree;

const QuizTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Subtitle = styled.p`
  color: #58576e;
  font-family: "NEXON Lv2 Gothic";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%;
  letter-spacing: -0.24px;
  margin-bottom: 20px;
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  margin-bottom: 80px;
`;

const QuizTypeDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  column-gap: 20px;
  box-sizing: border-box;
`;

const QuizTypeText = styled.div`
  color: #58576e;
  text-align: center;
  font-family: "NEXON Lv2 Gothic";
  font-size: 16px;
  font-weight: 500;
  line-height: 135%; /* 21.6px */
  letter-spacing: -0.24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 20px;
  margin-bottom: 60px;
`;
