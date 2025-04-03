import { useState } from "react";
import styled from "styled-components";
import Dropdown from "../../components/dropdown";
import PageAIQuizNavigation from "../../components/navigation/page-navigation";
import { gradeMap } from "../../utils/dropdown";

function PdfQuizPage() {
  const [currentStep, setCurrentStep] = useState(1);
  // 학교
  const [school, setSchool] = useState<string | null>("");
  //  학년
  const [grade, setGrade] = useState<string | null>("");
  // 학년 선택 dropdown
  const [isGradeDropDown, setIsGradeDropdown] = useState(false);
  // 과목 선택 dropdown
  const [isSubjectDropDown, setIsSubJectDropdown] = useState(false);

  const handleSchool = (e: React.MouseEvent<HTMLDivElement>) => {
    let value = e.target as HTMLElement;
    if (value) {
      setSchool(value.textContent);
    }
  };

  const handleGrade = (e: React.MouseEvent<HTMLDivElement>) => {
    let value = e.target as HTMLElement;
    if (value) {
      setGrade(value.textContent);
    }
  };

  console.log("학년", grade);
  console.log("학꾜오오오", school);
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
          <SchoolGradeContainer>
            <Subtitle>학교와 학년을 선택해주세요</Subtitle>
            <GradeDropdownContainer>
              <ButtonContainer onClick={handleSchool}>
                <Button>초등학교</Button>
                <Button>중학교</Button>
                <Button>고등학교</Button>
              </ButtonContainer>
              <img src="../../../src/assets/line.svg" />
              <Dropdown
                placeholder="학년 선택"
                isDropdown={isGradeDropDown}
                setIsDropdown={setIsGradeDropdown}
                itemArray={gradeMap}
                itemKey={school}
                handleSelectValue={handleGrade}
              />
            </GradeDropdownContainer>
          </SchoolGradeContainer>
          <SubjectContainer>
            <Subtitle>과목을 선택해 주세요.</Subtitle>
            <Dropdown placeholder="과목을 선택해 주세요" size="lg" />
          </SubjectContainer>
          <MainButton>퀴즈 주제 선정하기</MainButton>
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

const Button = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 16px;
  height: 56px;
  width: 146px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 999999px;
  border: 2px solid #e0e6fa;
  background: #fff;
  cursor: pointer;
  color: #8e8e96;
`;

// 과목

const SubjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  margin-bottom: 70px;
`;
const MainButton = styled.button`
  display: inline-flex;
  padding: 20px 52px;
  justify-content: center;
  align-items: center;
  border-radius: 999999px;
  background: #f4f5fa;
  border: none;
  outline: none;
  color: #b7b7c9;

  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 135%;
  letter-spacing: -0.3px;
`;
