import styled from "styled-components";
import { useStepOneStore } from "../../store";
import { gradeObject, subjectArray } from "../../utils/dropdown";
import SelectButton from "../button";
import GenerateButton from "../button/generate-button";
import Dropdown from "../dropdown";
import SingleDropdown from "../dropdown/single-dropdown";

interface StepOneProps {
  isGradeDropDown: boolean;
  setIsGradeDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isSubjectDropDown: boolean;
  setIsSubJectDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepOneGenerate: () => void;
  tempSchool: string;
  tempGrade: string;
  tempSubject: string;
  setTempSchool: React.Dispatch<React.SetStateAction<string>>;
  setTempGrade: React.Dispatch<React.SetStateAction<string>>;
  setTempSubject: React.Dispatch<React.SetStateAction<string>>;
}

function StepOne({
  isGradeDropDown,
  setIsGradeDropdown,
  isSubjectDropDown,
  setIsSubJectDropdown,
  handleStepOneGenerate,
  setTempSchool,
  tempSchool,
  tempGrade,
  tempSubject,
  setTempGrade,
  setTempSubject,
}: StepOneProps) {
  const school = useStepOneStore((state) => state.school);
  const grade = useStepOneStore((state) => state.grade);
  const subject = useStepOneStore((state) => state.subject);
  const handleGrade = (e: React.MouseEvent<HTMLDivElement> | null) => {
    if (!e) {
      setTempGrade("");
      return;
    }
    let value = e.target as HTMLElement;
    let newGrade = value.textContent as string;
    setTempGrade(newGrade);
  };
  const handleSubject = (e: React.MouseEvent<HTMLDivElement> | null) => {
    if (!e) {
      setTempSubject("");
      return;
    }
    let value = e.target as HTMLElement;
    let newSubject = value.textContent as string;
    setTempSubject(newSubject);
  };

  return (
    <>
      <SchoolGradeContainer>
        <Subtitle>학교와 학년을 선택해주세요</Subtitle>
        <GradeDropdownContainer>
          <ButtonContainer
            onClick={(e) => {
              let value = e.target as HTMLElement;
              let newSchool = value.textContent as string;
              setTempSchool(newSchool);
              if (school !== newSchool) {
                handleGrade(null);
              }
            }}
          >
            <SelectButton selected={tempSchool === "초등학교"}>
              초등학교
            </SelectButton>
            <SelectButton selected={tempSchool === "중학교"}>
              중학교
            </SelectButton>
            <SelectButton selected={tempSchool === "고등학교"}>
              고등학교
            </SelectButton>
          </ButtonContainer>
          <img src="../../../src/assets/line.svg" />
          <Dropdown
            size="sm"
            placeholder="학년 선택"
            isDropdown={isGradeDropDown}
            setIsDropdown={setIsGradeDropdown}
            itemArray={gradeObject}
            itemKey={tempSchool}
            selectedValue={tempGrade}
            handleDropdown={handleGrade}
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
          selectedValue={tempSubject}
          handleDropdown={handleSubject}
        />
      </SubjectContainer>
      <GenerateButton
        size="md"
        color="primary"
        onClick={handleStepOneGenerate}
        active={tempSchool && tempGrade && tempSubject ? true : false}
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
