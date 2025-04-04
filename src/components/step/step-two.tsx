import styled from "styled-components";
import { problemsArray } from "../../utils/dropdown";
import SelectButton from "../button";
import GenerateButton from "../button/generate-button";
import SingleDropdown from "../dropdown/single-dropdown";

interface StepTwoProps {
  quizSubject: string;
  setQuizbSubject: React.Dispatch<React.SetStateAction<string>>;
  isHighLevelDropdown: boolean;
  setIsHighLevelDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isMediumLevelDropdown: boolean;
  setIsMediumLevelDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isLowLevelDropdown: boolean;
  setIsLowLevelDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  highLevelProblem: string;
  setHighLevelProblem: React.Dispatch<React.SetStateAction<any>>;
  mediumLevelProblem: string;
  setMediumLevelProblem: React.Dispatch<React.SetStateAction<any>>;
  lowLevelProblem: string;
  setLowLevelProblem: React.Dispatch<React.SetStateAction<any>>;
  handleStepTwoGenerate: () => void;
}

function StepTwo({
  quizSubject,
  setQuizbSubject,
  isHighLevelDropdown,
  setIsHighLevelDropdown,
  isMediumLevelDropdown,
  setIsMediumLevelDropdown,
  isLowLevelDropdown,
  setIsLowLevelDropdown,
  highLevelProblem,
  setHighLevelProblem,
  mediumLevelProblem,
  setMediumLevelProblem,
  lowLevelProblem,
  setLowLevelProblem,
  handleStepTwoGenerate,
}: StepTwoProps) {
  const handleQuizSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizbSubject(e.target.value);
  };
  return (
    <>
      <QuizSubjectContainer>
        <QuizThemetContainer>
          <Subtitle>퀴즈 주제를 작성해 주세요.</Subtitle>
          <QuizInputContainer>
            <QuizInput value={quizSubject} onChange={handleQuizSubject} />
            <SelectButton selected={true}>주제 추천받기</SelectButton>
          </QuizInputContainer>
        </QuizThemetContainer>
        <QuizLevelContainer>
          <Subtitle>퀴즈의 난이도를 정해주세요.</Subtitle>
          <QuizLevelDropdownContainer>
            <QuizLevelText>난이도 상</QuizLevelText>
            <SingleDropdown
              placeholder="문항 수를 선택해 주세요."
              size="lg"
              isDropdown={isHighLevelDropdown}
              setIsDropdown={setIsHighLevelDropdown}
              itemArray={problemsArray}
              itemKey="high"
              selectValue={highLevelProblem}
              setSelectedValue={setHighLevelProblem}
            />
          </QuizLevelDropdownContainer>
          <QuizLevelDropdownContainer>
            <QuizLevelText>난이도 중</QuizLevelText>
            <SingleDropdown
              placeholder="문항 수를 선택해 주세요."
              size="lg"
              isDropdown={isMediumLevelDropdown}
              setIsDropdown={setIsMediumLevelDropdown}
              itemArray={problemsArray}
              itemKey="medium"
              selectValue={mediumLevelProblem}
              setSelectedValue={setMediumLevelProblem}
            />
          </QuizLevelDropdownContainer>
          <QuizLevelDropdownContainer>
            <QuizLevelText>난이도 하</QuizLevelText>
            <SingleDropdown
              placeholder="문항 수를 선택해 주세요."
              size="lg"
              isDropdown={isLowLevelDropdown}
              setIsDropdown={setIsLowLevelDropdown}
              itemArray={problemsArray}
              itemKey="low"
              selectValue={lowLevelProblem}
              setSelectedValue={setLowLevelProblem}
            />
          </QuizLevelDropdownContainer>
        </QuizLevelContainer>
        <ButtonContainer>
          <GenerateButton
            size="sm"
            color="default"
            onClick={() => {
              console.log("이전 설정으로 갑니다");
            }}
            active={false}
          >
            이전 설정보기
          </GenerateButton>
          <GenerateButton
            size="md"
            color="primary"
            onClick={handleStepTwoGenerate}
            active={!quizSubject ? false : true}
          >
            퀴즈 유형 정하기
          </GenerateButton>
        </ButtonContainer>
      </QuizSubjectContainer>
    </>
  );
}

export default StepTwo;

const QuizSubjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const QuizThemetContainer = styled.div`
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
  line-height: 135%;
  letter-spacing: -0.24px;
`;

const QuizInputContainer = styled.div`
  display: flex;
  row-gap: 8px;
  width: 100%;
`;

const QuizInput = styled.input`
  box-sizing: border-box;
  border-radius: 999999px;
  border: 2px solid #e0e6fa;
  background: #fff;
  display: flex;
  height: 56px;
  padding: 16px 24px 16px 32px;
  align-items: center;
  flex: 1 0 0;
`;

const QuizLevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 80px;
  width: 100%;
`;

const QuizLevelDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  column-gap: 20px;
  box-sizing: border-box;
`;

const QuizLevelText = styled.p`
  color: #58576e;

  text-align: center;
  font-family: "NEXON Lv2 Gothic";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 135%; /* 21.6px */
  letter-spacing: -0.24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 20px;
`;
