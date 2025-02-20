import { usePDF } from "@react-pdf/renderer";
import { useEffect, useRef, useState } from "react";
import { createQuestion } from "../actions/get-problems";
import Iframe from "../components/iframe";
import ModalComponent from "../components/modal/modal-component";
import PDFDocument from "../components/pdf";

function SectionTwo() {
  // 대상
  const [target, setTarget] = useState("대상선택하기");
  // 과목
  const [subject, setSubject] = useState("과목선택하기");
  //   주제
  const [theme, setTheme] = useState("");
  //   난이도
  const [level, setLevel] = useState("난이도선택하기");
  //   문제유형
  const [problemType, setProblemType] = useState("문제유형선택하기");

  // 문제 갯수
  const [problemCount, setProblemCount] = useState("");

  // pdf 다운로드
  const [isPDFDownload, setIsPDFDownload] = useState(false);

  // pdf 모달
  const [isModal, setIsModal] = useState(false);

  // server결과값
  const [responseProblems, setResponseProblems] = useState({ response: "" });

  // pdf hooks
  const [instance, updateInstance] = usePDF({
    document: (
      <PDFDocument
        problems={responseProblems}
        target={target}
        subject={subject}
        problemType={problemType}
      />
    ),
  });

  const modalRef = useRef<HTMLIFrameElement>(null);

  const handleModalClose = () => {
    setIsModal(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isProblemGenerate, setIsProblemGenerate] = useState(false);
  const handleTarget = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTarget(e.target.value);
  };

  const handleSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };

  const handleLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
  };

  const handleProblemType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProblemType(e.target.value);
  };

  const handleProblemCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProblemCount(e.target.value);
  };

  const handleGenerateProblems = async () => {
    setIsLoading(true);
    const response = await createQuestion({
      target,
      subject,
      theme,
      level,
      problemType,
      problemCount,
    });
    setIsLoading(false);
    setIsProblemGenerate(true);
    setResponseProblems(response);
  };

  const handlePDFDownload = () => {
    setIsPDFDownload(true);
    setIsModal(true);
  };

  useEffect(() => {
    updateInstance(
      <PDFDocument
        problems={responseProblems}
        target={target}
        subject={subject}
        problemType={problemType}
      />
    );
  }, [responseProblems]);
  // https://react-pdf.org/

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="h-full w-full flex flex-col items-center  bg-blue-100">
        <h1 className="font-bold text-4xl mt-40 mb-10">AI 맞춤형 학습</h1>
        <div className="bg-gray-200 flex flex-col gap-10 p-4 mb-10 ">
          {/* 대상 선택하기 */}
          <div className="flex flex-row justify-between">
            <label>학생&학년</label>
            <select
              className="border-2 w-[180px] text-center"
              onChange={handleTarget}
            >
              <option value="text-menu">대상선택하기</option>
              <option value="elementary">초등학교</option>
              <option value="middleschool">중학교</option>
              <option value="highschool">고등학교</option>
              <option value="university">대학교</option>
            </select>
          </div>
          {/* 과목선택 */}
          <div className="flex flex-row justify-between bg-red-100">
            <label>과목</label>
            <select
              className="border-2 w-[180px] text-center"
              onChange={handleSubject}
            >
              <option value="text-menu">과목 선택하기</option>
              <option value="math">수학</option>
              <option value="english">영어</option>
              <option value="science">과학</option>
              <option value="history">역사</option>
            </select>
          </div>
          {/* 주제선택 */}
          <div className="flex flex-row justify-between">
            <label>주제</label>
            <input className="border-2" onChange={handleTheme} value={theme} />
          </div>
          {/* 난이도 선택 */}
          <div className="flex flex-row justify-between">
            <label>난이도</label>
            <select
              className="border-2 w-[180px] text-center"
              onChange={handleLevel}
            >
              <option value="text-menu">난이도 선택하기</option>
              <option value="easy">쉬움</option>
              <option value="medium">보통</option>
              <option value="difficulty">어려움</option>
            </select>
          </div>
          {/* 문제유형 선택 */}
          <div className="flex flex-row justify-between">
            <label>문제유형</label>
            <select
              className="border-2 w-[180px] text-center"
              onChange={handleProblemType}
            >
              <option value="text-menu">문제 유형 선택하기</option>
              <option value="short-answer-question">객관식</option>
              <option value="essay-question">주관식</option>
            </select>
          </div>
          {/* 문제갯수 선택 */}
          <div className="flex flex-row justify-between">
            <label>문제갯수</label>
            <select
              className="border-2 w-[180px] text-center"
              onChange={handleProblemCount}
            >
              <option value="text-menu">문제 갯수 선택하기</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
        <button
          className="border-2 bg-gray-700 text-amber-100 w-[200px] p-4"
          onClick={handleGenerateProblems}
        >
          문제 생성 하기
        </button>
        {isLoading && <p>문제를 생성하고 있습니다</p>}
        {!isLoading && isProblemGenerate && (
          <div>
            <p>문제가 생성되었습니다</p>
            <button onClick={handlePDFDownload}>
              pdf로 문제 다운로드 받기
            </button>
          </div>
        )}
      </div>
      {/* isPDFDownload && instance.url */}
      {/* 추후게 조건으로 넣을것  */}
      {isModal && (
        <ModalComponent
          component={
            <Iframe
              url={instance.url}
              modalRef={modalRef}
              handleModalClose={handleModalClose}
            />
          }
        />
      )}
      {/* <ModalComponent
        component={
          <Iframe
            url={instance.url}
            modalRef={modalRef}
            handleModalClose={handleModalClose}
          />
        }
      /> */}
    </div>
  );
}

export default SectionTwo;
