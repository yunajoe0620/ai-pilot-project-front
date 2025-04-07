import { useState } from "react";
import styled from "styled-components";
import {
  useStepOneStore,
  useStepThreeStore,
  useStepTwoStore,
} from "../../store";
import { gradeObject, problemsArray, subjectArray } from "../../utils/dropdown";
import SelectButton from "../button";
import GenerateButton from "../button/generate-button";
import Dropdown from "../dropdown";
import SingleDropdown from "../dropdown/single-dropdown";

interface StepFourPartTwoProps {
  isGradeDropDown: boolean;
  setIsGradeDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isSubjectDropDown: boolean;
  setIsSubJectDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isHighLevelDropdown: boolean;
  setIsHighLevelDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isMediumLevelDropdown: boolean;
  setIsMediumLevelDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isLowLevelDropdown: boolean;
  setIsLowLevelDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isMultipleChoideDropdown: boolean;
  setIsMultipleChoiceDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isShortAnswerDropdown: boolean;
  setIsShortAnswerDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

function StepFourPartTwo({}: //   isGradeDropDown,
//   setIsGradeDropdown,
//   isSubjectDropDown,
//   setIsSubJectDropdown,
//   isHighLevelDropdown,
//   setIsHighLevelDropdown,
//   isMediumLevelDropdown,
//   setIsMediumLevelDropdown,
//   isLowLevelDropdown,
//   setIsLowLevelDropdown,
//   isMultipleChoideDropdown,
//   setIsMultipleChoiceDropdown,
//   isShortAnswerDropdown,
//   setIsShortAnswerDropdown,
StepFourPartTwoProps) {
  const [showSetting, setShowSetting] = useState(true);
  const school = useStepOneStore((state) => state.school);
  const grade = useStepOneStore((state) => state.grade);
  const subject = useStepOneStore((state) => state.subject);
  const quizSubject = useStepTwoStore((state) => state.quizSubject);
  //   const totalProblem = useStepTwoStore((state) => state.totalProblem);

  const highLevelProblem = useStepTwoStore((state) => state.highLevelProblem);
  const mediumLevelProblem = useStepTwoStore(
    (state) => state.mediumLevelProblem
  );
  const lowLevelProblem = useStepTwoStore((state) => state.lowLevelProblem);
  const multipleChoice = useStepThreeStore((state) => state.multipleChoice);
  const shortAnswer = useStepThreeStore((state) => state.shortAnswer);

  const handleGrade = useStepOneStore((state) => state.handleGrade);
  const handleSchool = useStepOneStore((state) => state.handleSchool);
  //   const handleSubject = useStepOneStore((state) => state.handleSubject);
  //   const handleQuizSubject = useStepTwoStore((state) => state.handleQuizSubject);
  //   const handleHighLevelProblem = useStepTwoStore(
  //     (state) => state.handleHighLevelProblem
  //   );
  //   const handleMediumLevelProblem = useStepTwoStore(
  //     (state) => state.handleMediumLevelProblem
  //   );
  //   const handleLowLevelProblem = useStepTwoStore(
  //     (state) => state.handleLowLevelProblem
  //   );

  //   const handleMultipleChoice = useStepThreeStore(
  //     (state) => state.handleMultipleChoice
  //   );
  //   const handleShortAnswerProblem = useStepThreeStore(
  //     (state) => state.handleShortAnswerProblem
  //   );

  return (
    <Container>
      <RegenerateContainer>
        <TextOne>
          결과가 맘에 들지 않나요? 추가 요청을 통해 문제를 다시 만들어봐요.
        </TextOne>
        <QuizInput
          value=""
          onChange={(e) => {
            console.log("eee", e);
          }}
        />
      </RegenerateContainer>
      <SettingContainer
        role="button"
        onClick={() => {
          setShowSetting(!showSetting);
        }}
      >
        <ToolTipContainer>
          <TextTwo>문제 설정 상세보기</TextTwo>
          <img src="../../../src/assets/tooltip.svg" />
        </ToolTipContainer>
        {!showSetting ? (
          <img src="../../../src/assets/arrow-down.svg" />
        ) : (
          <img src="../../../src/assets/arrow-up.svg" />
        )}
      </SettingContainer>
      {/* 기존 설정들 다시 보기  */}
      {showSetting && (
        <div style={{ width: "100%" }}>
          {/* 학교와 학년 */}
          <SchoolGradeContainer>
            <Subtitle>학교와 학년을 선택해주세요</Subtitle>
            <GradeDropdownContainer>
              <ButtonContainer
              // onClick={(e) => {
              //   let value = e.target as HTMLElement;
              //   let newSchool = value.textContent as string;
              //   if (school !== newSchool) {
              //     handleGrade(null);
              //   }

              //   handleSchool(e);
              // }}
              >
                <SelectButton selected={school === "초등학교"}>
                  초등학교
                </SelectButton>
                <SelectButton selected={school === "중학교"}>
                  중학교
                </SelectButton>
                <SelectButton selected={school === "고등학교"}>
                  고등학교
                </SelectButton>
              </ButtonContainer>
              <img src="../../../src/assets/line.svg" />
              <Dropdown
                size="sm"
                placeholder="학년 선택"
                isEdit={false}
                // isDropdown={isGradeDropDown}
                // setIsDropdown={setIsGradeDropdown}
                itemArray={gradeObject}
                itemKey={school}
                selectedValue={grade}
                // handleDropdown={handleGrade}
              />
            </GradeDropdownContainer>
          </SchoolGradeContainer>
          {/* 과목 */}
          <SubjectContainer>
            <Subtitle>과목을 선택해 주세요.</Subtitle>
            <SingleDropdown
              placeholder="과목을 선택해 주세요"
              size="lg"
              itemArray={subjectArray}
              itemKey="subject"
              selectedValue={subject}
              isEdit={false}
            />
          </SubjectContainer>

          {/* 퀴즈주제 */}
          <QuizThemetContainer>
            <Subtitle>퀴즈 주제를 작성해 주세요.</Subtitle>
            <QuizInputContainer>
              <QuizInput
                isEdit={false}
                readOnly
                value={quizSubject}
                // onChange={(e) => {
                //   handleQuizSubject(e);
                // }}
              />
              <SelectButton selected={true}>주제 추천받기</SelectButton>
            </QuizInputContainer>
          </QuizThemetContainer>

          {/* 퀴즈 난이도 */}
          <QuizLevelContainer>
            <Subtitle>퀴즈의 난이도를 정해주세요.</Subtitle>
            <QuizLevelDropdownContainer>
              <QuizLevelText>난이도 상</QuizLevelText>
              <SingleDropdown
                placeholder="문항 수를 선택해 주세요."
                size="lg"
                // isDropdown={isHighLevelDropdown}
                // setIsDropdown={setIsHighLevelDropdown}
                itemArray={problemsArray}
                itemKey="high"
                selectedValue={highLevelProblem}
                isEdit={false}
                // handleDropdown={handleHighLevelProblem}
              />
            </QuizLevelDropdownContainer>
            <QuizLevelDropdownContainer>
              <QuizLevelText>난이도 중</QuizLevelText>
              <SingleDropdown
                placeholder="문항 수를 선택해 주세요."
                size="lg"
                // isDropdown={isMediumLevelDropdown}
                // setIsDropdown={setIsMediumLevelDropdown}
                itemArray={problemsArray}
                itemKey="medium"
                selectedValue={mediumLevelProblem}
                isEdit={false}
                // handleDropdown={handleMediumLevelProblem}
              />
            </QuizLevelDropdownContainer>
            <QuizLevelDropdownContainer>
              <QuizLevelText>난이도 하</QuizLevelText>
              <SingleDropdown
                placeholder="문항 수를 선택해 주세요."
                size="lg"
                // isDropdown={isLowLevelDropdown}
                // setIsDropdown={setIsLowLevelDropdown}
                itemArray={problemsArray}
                itemKey="low"
                selectedValue={lowLevelProblem}
                // handleDropdown={handleLowLevelProblem}
                isEdit={false}
              />
            </QuizLevelDropdownContainer>
          </QuizLevelContainer>

          {/* 퀴즈의 유형 */}
          <QuizTypeContainer>
            <Subtitle>퀴즈의 유형을 정해주세요.</Subtitle>
            <DropDownContainer>
              <QuizTypeDropdownContainer>
                <QuizTypeText>객관식 문제</QuizTypeText>
                <SingleDropdown
                  placeholder="문항 수를 선택해 주세요."
                  size="lg"
                  //   isDropdown={isMultipleChoideDropdown}
                  //   setIsDropdown={setIsMultipleChoiceDropdown}
                  itemArray={problemsArray}
                  itemKey="multlpleChoice"
                  selectedValue={multipleChoice}
                  //   handleDropdown={(e: React.MouseEvent<HTMLDivElement>) => {
                  //     //  왜 false일까유?
                  //     // console.log("typeofe", e instanceof HTMLElement);
                  //     let value = e.target as HTMLElement;
                  //     let selectedMultipleChoice = value.textContent as string;
                  //     if (Number(selectedMultipleChoice) > totalProblem) {
                  //       alert("총 문제보다 문제수가 클 수는 없습니다");
                  //       return;
                  //     }

                  //     handleMultipleChoice(e);
                  //   }}
                  isEdit={false}
                />
              </QuizTypeDropdownContainer>
              <QuizTypeDropdownContainer>
                <QuizTypeText>주관식 문제</QuizTypeText>
                <SingleDropdown
                  placeholder="문항 수를 선택해 주세요."
                  size="lg"
                  //   isDropdown={isShortAnswerDropdown}
                  //   setIsDropdown={setIsShortAnswerDropdown}
                  itemArray={problemsArray}
                  itemKey="shortAnswer"
                  selectedValue={shortAnswer}
                  isEdit={false}
                  //   handleDropdown={(e: React.MouseEvent<HTMLDivElement>) => {
                  //     let value = e.target as HTMLElement;
                  //     let selectedShortAnswer = value.textContent as string;
                  //     if (Number(selectedShortAnswer) > totalProblem) {
                  //       alert("총 문제보다 문제수가 클 수는 없습니다");
                  //       return;
                  //     }
                  //     handleShortAnswerProblem(e);
                  //   }}
                />
              </QuizTypeDropdownContainer>
            </DropDownContainer>
          </QuizTypeContainer>
        </div>
      )}
      <GenerateButton
        size="md"
        color="primary"
        onClick={() => {
          console.log("하잇");
        }}
        active={false}
      >
        AI 퀴즈 생성하기
      </GenerateButton>
    </Container>
  );
}

export default StepFourPartTwo;

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegenerateContainer = styled.div`
  width: 100%;
  margin-bottom: 70px;
`;

const TextOne = styled.p`
  color: #58576e;
  font-family: "NEXON Lv2 Gothic";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%;
  letter-spacing: -0.24px;
  margin-bottom: 20px;
`;

const QuizInput = styled.input<{ isEdit?: boolean }>`
  box-sizing: border-box;
  border-radius: 999999px;
  border: 2px solid #e0e6fa;
  background: #fff;
  display: flex;
  height: 56px;
  padding: 16px 24px 16px 32px;
  align-items: center;
  width: 100%;
  flex: 1 0 0;
  cursor: ${({ isEdit }) => (isEdit ? "pointer" : "not-allowed")};
`;

const SettingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ToolTipContainer = styled.div`
  display: flex;
  column-gap: 8px;
`;
const TextTwo = styled.p`
  color: #58576e;
  font-family: "NEXON Lv2 Gothic";
  font-size: 16px;
  font-weight: 500;
  line-height: 135%;
  letter-spacing: -0.24px;
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

const SubjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  margin-bottom: 60px;
`;

const QuizThemetContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 60px;
  width: 100%;
`;

const QuizInputContainer = styled.div`
  display: flex;
  width: 100%;
  column-gap: 8px;
`;

const QuizLevelContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 60px;
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
  line-height: 135%;
  letter-spacing: -0.24px;
`;

const QuizTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 60px;
  width: 100%;
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
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
