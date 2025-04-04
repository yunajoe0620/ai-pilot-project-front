import styled from "styled-components";
import { gradeObject, subjectArray } from "../../utils/dropdown";
import SelectButton from "../button";
import GenerateButton from "../button/generate-button";
import Dropdown from "../dropdown";
import SingleDropdown from "../dropdown/single-dropdown";

interface StepOneProps {
  school: string | null;
  grade: string | null;
  subject: string | null;
  // setGrade?: React.Dispatch<React.SetStateAction<string | null>>;
  setSubject: React.Dispatch<React.SetStateAction<string | null>>;
  isGradeDropDown: boolean;
  setIsGradeDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isSubjectDropDown: boolean;
  setIsSubJectDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  handleSchool: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleStepOneGenerate: any;
  handleDropdown: any;
}

function StepOne({
  school,
  grade,
  subject,
  // setGrade,
  setSubject,
  isGradeDropDown,
  setIsGradeDropdown,
  isSubjectDropDown,
  setIsSubJectDropdown,
  handleSchool,
  handleStepOneGenerate,
  handleDropdown,
}: StepOneProps) {
  return (
    <>
      <SchoolGradeContainer>
        <Subtitle>학교와 학년을 선택해주세요</Subtitle>
        <GradeDropdownContainer>
          <ButtonContainer onClick={handleSchool}>
            <SelectButton selected={school === "초등학교"}>
              초등학교
            </SelectButton>
            <SelectButton selected={school === "중학교"}>중학교</SelectButton>
            <SelectButton selected={school === "고등학교"}>
              고등학교
            </SelectButton>
          </ButtonContainer>
          <img src="../../../src/assets/line.svg" />
          <Dropdown
            placeholder="학년 선택"
            isDropdown={isGradeDropDown}
            setIsDropdown={setIsGradeDropdown}
            itemArray={gradeObject}
            itemKey={school}
            selectValue={grade}
            handleDropdown={handleDropdown}
            // setSelectedValue={setGrade}
          />
        </GradeDropdownContainer>
      </SchoolGradeContainer>
      <SubjectContainer>
        <Subtitle>과목을 선택해 주세요.</Subtitle>
        <SingleDropdown
          placeholder="과목을 선택해 주세요"
          size="lg"
          isDropdown={isSubjectDropDown}
          setIsDropdown={setIsSubJectDropdown}
          itemArray={subjectArray}
          itemKey="subject"
          selectValue={subject}
          setSelectedValue={setSubject}
        />
      </SubjectContainer>
      <GenerateButton
        size="md"
        color="primary"
        onClick={handleStepOneGenerate}
        active={school && grade && subject ? true : false}
      >
        퀴즈 주제 선정하기
      </GenerateButton>
    </>
  );
}

export default StepOne;

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
