import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useStepOneStore, useStepTwoStore } from "../../store";
import {
  majorCurriculumArray,
  mediumCurriculumArray,
  returnMajorSubjectListKey,
  returnMediumSubjectListKey,
  returnSubSubjectListKey,
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
  isReset: boolean;
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
}

function SubjectRecommendationModal({
  isMajorCurriculumDropdown,
  setIsMajorCurriculumDropdown,
  isMediumCurriculumDropdown,
  setIsMediumCurriculumDropdown,
  isSubCurriculumDropdown,
  setIsSubCurriculumDropdown,
  setIsModalOpen,
  isReset,
  setIsReset,
}: SubjectRecommendationModalProps) {
  const [tempMajorSubject, setTempMajorSubject] = useState("");
  const [tempMediumSubject, setTempMediumSubject] = useState("");
  const [tempSubSubject, setTempSubSubject] = useState("");

  const school = useStepOneStore((state) => state.school);
  const grade = useStepOneStore((state) => state.grade);
  const subject = useStepOneStore((state) => state.subject);

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

  const handleCloseModal = () => {
    // 저장되어 있는게 없을떄
    if (!tempMajorSubject && !tempMediumSubject && !tempSubSubject) {
      if (!isThemeGenerateButton) {
        handleMajorSubject(null);
        handleMediumSubject(null);
        handleSubSubject(null);
      }
      //
    }

    // 저장되어 있는게 있을때

    // 3개다
    if (tempMajorSubject && tempMediumSubject && tempSubSubject) {
      if (
        !isThemeGenerateButton &&
        tempMajorSubject !== majorSubject &&
        tempMediumSubject !== mediumSubject &&
        tempSubSubject !== subSubject
      ) {
        handleMajorSubject(tempMajorSubject);
        handleMediumSubject(tempMediumSubject);
        handleSubSubject(tempSubSubject);
      }
    }

    if (tempMajorSubject && tempMediumSubject) {
      if (
        !isThemeGenerateButton &&
        tempMajorSubject !== majorSubject &&
        tempMediumSubject !== mediumSubject
      ) {
        handleMajorSubject(tempMajorSubject);
        handleMediumSubject(tempMediumSubject);
      }
    }

    if (tempMajorSubject) {
      if (!isThemeGenerateButton && tempMajorSubject !== majorSubject) {
        handleMajorSubject(tempMajorSubject);
      }
    }

    setIsModalOpen(false);
  };

  const handleThemeGenerate = () => {
    const mediumItemKey = `${school}-${grade}-${subject}-${majorSubject}`;
    const subItemKey = `${school}-${grade}-${subject}-${majorSubject}-${mediumSubject}`;

    // 하위 영역
    if (subCurriculumArray[subItemKey]) {
      const result = Boolean(subSubject);
      if (!result) {
        alert("하위영역을 선택해주세요");
        return;
      }
    }

    // 상세영역
    if (mediumCurriculumArray[mediumItemKey]) {
      const result = Boolean(mediumSubject);
      if (!result) {
        alert("상세영역을 선택해주세요");
        return;
      }
    }

    if (!majorSubject) {
      alert("주제를 선택해주세요");
      return;
    }

    handleQuizSubject(`${majorSubject} ${mediumSubject} ${subSubject}`);
    setIsModalOpen(false);
    handleThemeGenerateButton(true);
  };

  useEffect(() => {
    setTempMajorSubject(majorSubject);
    setTempMediumSubject(mediumSubject);
    setTempSubSubject(subSubject);
    handleThemeGenerateButton(false);
  }, []);

  // activation 조건
  const isActive = useMemo(() => {
    let mediumItemKey;
    let subItemKey;

    // 과목이 영어일때 key값은 다루다
    if (subject === "영어") {
      mediumItemKey = `${school}-${subject}-${majorSubject}`;
      subItemKey = `${school}-${subject}-${majorSubject}-${mediumSubject}`;
    } else {
      mediumItemKey = `${school}-${grade}-${subject}-${majorSubject}`;
      subItemKey = `${school}-${grade}-${subject}-${majorSubject}-${mediumSubject}`;
    }

    if (subCurriculumArray[subItemKey]) {
      return Boolean(subSubject);
    }
    if (mediumCurriculumArray[mediumItemKey]) {
      return Boolean(mediumSubject);
    }

    return false;
  }, [majorSubject, mediumSubject, subSubject]);

  useEffect(() => {
    if (isReset) {
      handleMajorSubject(null);
      handleMediumSubject(null);
      handleSubSubject(null);
      setTempMajorSubject("");
      setTempMediumSubject("");
      setTempSubSubject("");
      setIsReset(false);
    }
  }, []);

  return (
    <Container>
      <ThemeContainer>
        <SubTitle>{subject} 교과 과정을 추천해 드릴게요!</SubTitle>
        <SingleDropdown
          placeholder="큰 주제를 선택해 주세요."
          size="lg"
          isDropdown={isMajorCurriculumDropdown}
          setIsDropdown={setIsMajorCurriculumDropdown}
          itemArray={majorCurriculumArray}
          itemKey={returnMajorSubjectListKey(school, grade, subject)}
          selectedValue={majorSubject}
          handleDropdown={(e) => {
            let value = e.target as HTMLElement;
            let selectedValue = value.textContent as string;
            if (majorSubject !== selectedValue) {
              handleMediumSubject(null);
              handleSubSubject(null);
            }
            handleMajorSubject(e);
          }}
        ></SingleDropdown>
        <SingleDropdown
          placeholder="상세 영역을 선택해 주세요."
          size="lg"
          isDropdown={isMediumCurriculumDropdown}
          setIsDropdown={setIsMediumCurriculumDropdown}
          itemArray={mediumCurriculumArray}
          itemKey={returnMediumSubjectListKey(
            school,
            grade,
            subject,
            majorSubject
          )}
          selectedValue={mediumSubject}
          handleDropdown={(e) => {
            let value = e.target as HTMLElement;
            let selectedValue = value.textContent as string;
            if (mediumSubject !== selectedValue) {
              handleSubSubject(null);
            }
            handleMediumSubject(e);
          }}
          alertMessage="주제를 먼저 선택해주세요"
        ></SingleDropdown>
        <SingleDropdown
          placeholder="하위 영역을 선택해 주세요."
          size="lg"
          isDropdown={isSubCurriculumDropdown}
          setIsDropdown={setIsSubCurriculumDropdown}
          itemArray={subCurriculumArray}
          itemKey={returnSubSubjectListKey(
            school,
            grade,
            subject,
            majorSubject,
            mediumSubject
          )}
          selectedValue={subSubject}
          handleDropdown={(e) => {
            handleSubSubject(e);
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
          active={isActive}
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
