import styled from "styled-components";
import { subjectArray } from "../../utils/dropdown";
import GenerateButton from "../button/generate-button";
import SingleDropdown from "../dropdown/single-dropdown";

function SubjectRecommendationModal() {
  return (
    <Container>
      <ThemeContainer>
        <SubTitle>수학 교과 과정을 추천해 드릴게요!</SubTitle>
        <SingleDropdown
          placeholder="큰 주제를 선택해 주세요."
          size="lg"
          itemArray={subjectArray}
          itemKey="subject"
          selectedValue=""
          handleDropdown={() => {}}
        ></SingleDropdown>
        <SingleDropdown
          placeholder="상세 영역을 선택해 주세요."
          size="lg"
          itemArray={subjectArray}
          itemKey="subject"
          selectedValue=""
          handleDropdown={() => {}}
        ></SingleDropdown>
        <SingleDropdown
          placeholder="하위 영역을 선택해 주세요."
          size="lg"
          itemArray={subjectArray}
          itemKey="subject"
          selectedValue=""
          handleDropdown={() => {}}
        ></SingleDropdown>
      </ThemeContainer>
      <ButtonContainer>
        <GenerateButton
          size="sm"
          color="default"
          onClick={() => {}}
          active={false}
        >
          닫기
        </GenerateButton>
        <GenerateButton
          size="md"
          color="primary"
          onClick={() => {}}
          active={false}
        >
          주제 적용하기
        </GenerateButton>
      </ButtonContainer>
    </Container>
  );
}

export default SubjectRecommendationModal;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  padding: 60px 32px 80px 32px;
  flex-direction: column;
  align-items: center;
  row-gap: 60px;
  width: 724px;
  border-radius: 24px;
  background: #fff;

  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(2px);
  box-sizing: border-box;
`;
const ThemeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const SubTitle = styled.p`
  color: #58576e;
  font-family: "NEXON Lv2 Gothic";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 21.6px */
  letter-spacing: -0.24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
`;
