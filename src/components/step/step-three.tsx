import { useEffect, useState } from "react";
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
}

// max 60 문항
function StepThree({
  isMultipleChoideDropdown,
  setIsMultipleChoiceDropdown,
  isShortAnswerDropdown,
  setIsShortAnswerDropdown,
  handleStepThreeGenerate,
  setCurrentStep,
}: StepThreeProps) {
  const [totalProblems, setTotalProblems] = useState(0);
  const highLevelProblem = useStepTwoStore((state) => state.highLevelProblem);
  const mediumLevelProblem = useStepTwoStore(
    (state) => state.mediumLevelProblem
  );
  const lowLevelProblem = useStepTwoStore((state) => state.lowLevelProblem);

  console.log(
    "문제유형들",
    highLevelProblem,
    mediumLevelProblem,
    lowLevelProblem
  );

  const multipleChoice = useStepThreeStore((state) => state.multipleChoice);
  const handleMultipleChoice = useStepThreeStore(
    (state) => state.handleMultipleChoice
  );

  const shortAnswer = useStepThreeStore((state) => state.shortAnswer);
  const handleShortAnswerProblem = useStepThreeStore(
    (state) => state.handleShortAnswerProblem
  );

  //
  useEffect(() => {
    const total =
      Number(highLevelProblem) +
      Number(mediumLevelProblem) +
      Number(lowLevelProblem);
    setTotalProblems(total);
  }, [highLevelProblem, mediumLevelProblem, lowLevelProblem]);

  // 객관식 선택했을때 주관식 자동으로 하는 롸직
  useEffect(() => {
    if (totalProblems > 0 && Number(multipleChoice) > 0) {
      let calSubjectProblems = totalProblems - Number(multipleChoice);
      handleShortAnswerProblem(calSubjectProblems);
    }
  }, [totalProblems, multipleChoice]);

  // 주관식을 선택했을때 객관식 자동으로 하는 롸직

  useEffect(() => {
    if (totalProblems > 0 && Number(shortAnswer) > 0) {
      let calSubjectProblems = totalProblems - Number(shortAnswer);
      handleMultipleChoice(calSubjectProblems);
    }
  }, [totalProblems, shortAnswer]);

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
              if (Number(selectedMultipleChoice) > totalProblems) {
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
              if (Number(selectedShortAnswer) > totalProblems) {
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
`;
