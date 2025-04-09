import { useState } from "react";
import styled from "styled-components";
import { useStepTwoStore } from "../../store";
import {
  majorCurriculumArray,
  mediumCurriculumArray,
  subCurriculumArray,
} from "../../utils/dropdown";
import GenerateButton from "../button/generate-button";
import SingleDropdown from "../dropdown/single-dropdown";

interface SubjectRecommendationModalProps {
  isMajorCurriculumDropdown: boolean;
  setIsMajorCurriculumDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isMediumCurriculumDropdown: boolean;
  setIsMediumCurriculumDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  isSubCurriculumDropdown: boolean;
  setIsSubCurriculumDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SubjectRecommendationModal({
  isMajorCurriculumDropdown,
  setIsMajorCurriculumDropdown,
  isMediumCurriculumDropdown,
  setIsMediumCurriculumDropdown,
  isSubCurriculumDropdown,
  setIsSubCurriculumDropdown,

  setIsModalOpen,
}: SubjectRecommendationModalProps) {
  const [tempMajorSubject, setTempMajorSubject] = useState("");
  const [tempMediumSubject, setTempMediumSubject] = useState("");
  const [tempSubSubject, setTempSubSubject] = useState("");

  const majorSubject = useStepTwoStore((state) => state.majorSubject);
  const handleMajorSubject = useStepTwoStore(
    (state) => state.handleMajorSubject
  );

  const mediumSubject = useStepTwoStore((state) => state.mediumSubject);
  const handleMediumSubject = useStepTwoStore(
    (state) => state.handleMediumSubject
  );

  const subSubject = useStepTwoStore((state) => state.subSubject);

  const isThemeGenerateButton = useStepTwoStore(
    (state) => state.isThemeGenerateButton
  );
  const handleSubSubject = useStepTwoStore((state) => state.handleSubSubject);
  const handleQuizSubject = useStepTwoStore((state) => state.handleQuizSubject);
  const handleThemeGenerateButton = useStepTwoStore(
    (state) => state.handleThemeGenerateButton
  );

  // 문제
  // 한번 적용하기를 누른 다음에 handler만 사용해도 그게 적용하기 했던 값으로 저장이 된다.
  // 원래 하려고 했던 것은? => 처음에 버튼을 눌렀을때 적용했떤 그 값이 나와야한다.
  //

  const handleCloseModal = () => {
    if (!isThemeGenerateButton) {
      handleMajorSubject(null);
      handleMediumSubject(null);
      handleSubSubject(null);
    }
    setIsModalOpen(false);
  };

  const handleThemeGenerate = () => {
    if (!majorSubject) {
      alert("주제를 선택해주세요");
      return;
    }

    if (!mediumSubject) {
      alert("상세 영역을 선택해주세요");
      return;
    }
    if (!subSubject) {
      alert("하위 영역을 선택해주세요");
      return;
    }

    handleQuizSubject(`${majorSubject} ${mediumSubject} ${subSubject}`);
    setIsModalOpen(false);
    handleThemeGenerateButton();
  };
  // console.log("isGenerateButton입니다아아", isThemeGenerateButton);
  console.log(
    "tempMajorSubject",
    tempMajorSubject,
    tempMediumSubject,
    tempSubSubject
  );

  return (
    <Container>
      <ThemeContainer>
        <SubTitle>수학 교과 과정을 추천해 드릴게요!</SubTitle>
        <SingleDropdown
          placeholder="큰 주제를 선택해 주세요."
          size="lg"
          isDropdown={isMajorCurriculumDropdown}
          setIsDropdown={setIsMajorCurriculumDropdown}
          itemArray={majorCurriculumArray}
          itemKey="math"
          selectedValue={majorSubject}
          handleDropdown={(e) => {
            let value = e.target as HTMLElement;
            let selectedValue = value.textContent as string;
            setTempMajorSubject(selectedValue);
            // if (majorSubject !== selectedValue) {
            //   handleMediumSubject(null);
            //   handleSubSubject(null);
            // }
            // handleMajorSubject(e);
          }}
        ></SingleDropdown>
        <SingleDropdown
          placeholder="상세 영역을 선택해 주세요."
          size="lg"
          isDropdown={isMediumCurriculumDropdown}
          setIsDropdown={setIsMediumCurriculumDropdown}
          itemArray={mediumCurriculumArray}
          itemKey={majorSubject}
          selectedValue={mediumSubject}
          handleDropdown={(e) => {
            let value = e.target as HTMLElement;
            let selectedValue = value.textContent as string;
            setTempMediumSubject(selectedValue);
            // if (mediumSubject !== selectedValue) {
            //   handleSubSubject(null);
            // }
            // handleMediumSubject(e);
          }}
          alertMessage="주제를 먼저 선택해주세요"
        ></SingleDropdown>
        <SingleDropdown
          placeholder="하위 영역을 선택해 주세요."
          size="lg"
          isDropdown={isSubCurriculumDropdown}
          setIsDropdown={setIsSubCurriculumDropdown}
          itemArray={subCurriculumArray}
          itemKey={mediumSubject}
          selectedValue={subSubject}
          handleDropdown={(e) => {
            let value = e.target as HTMLElement;
            let selectedValue = value.textContent as string;
            setTempSubSubject(selectedValue);
            // handleSubSubject(e);
          }}
          alertMessage="상세 영역을 선택해 주세요."
        />
      </ThemeContainer>
      <ButtonContainer>
        <GenerateButton
          size="sm"
          color="default"
          onClick={handleCloseModal}
          active={false}
        >
          닫기
        </GenerateButton>
        <GenerateButton
          size="md"
          color="primary"
          onClick={handleThemeGenerate}
          active={majorSubject && mediumSubject && subSubject ? true : false}
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
