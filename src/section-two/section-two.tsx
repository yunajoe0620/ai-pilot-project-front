import { usePDF } from "@react-pdf/renderer";
import { useEffect, useRef, useState } from "react";
import { createQuestion } from "../actions/get-problems";
import Iframe from "../components/iframe";
import ModalComponent from "../components/modal/modal-component";
import PDFDocument from "../components/pdf";
import { PromiseResultItemArray } from "../schemas/problem";
import {
  problemAndanswerSplit,
  problemSplit,
  returnPromiseProblemsArray,
} from "../utils/section-two";

function SectionTwo() {
  // 대상
  const [target, setTarget] = useState("대상선택하기");
  // 과목
  const [subject, setSubject] = useState("과목선택하기");
  //   주제
  const [theme, setTheme] = useState("");
  //   난이도
  // const [level, setLevel] = useState("난이도선택하기");

  // 난이도222
  const [level, setLevel] = useState({
    easy: "0",
    medium: "0",
    difficult: "0",
  });
  //   문제유형222
  // const [problemType, setProblemType] = useState("문제유형선택하기");
  const [problemType, setProblemType] = useState({
    multipleChoice: "0",
    subject: "0",
  });

  // 총 문제 갯수
  const [problemCount, setProblemCount] = useState(0);

  console.log("총갯수", problemCount);
  console.log("level", level);
  console.log("problemType", problemType);

  // pdf 다운로드
  const [isPDFDownload, setIsPDFDownload] = useState(false);

  // pdf 모달
  const [isModal, setIsModal] = useState(false);

  // server결과값
  const [responseProblems, setResponseProblems] = useState({ response: "" });

  const [pdfProblems, setPdfProblems] = useState<[] | PromiseResultItemArray[]>(
    []
  );
  const [pdfAnswers, setPdfAnswers] = useState("");

  // pdf hooks
  const [instance, updateInstance] = usePDF({
    document: (
      <PDFDocument
        pdfProblems={pdfProblems}
        pdfAnswers={pdfAnswers}
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

  // 난이도 쉬움 handler
  const handleEasyLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel((prev) => {
      return {
        ...prev,
        easy: e.target.value,
      };
    });

    // totalCount
    setProblemCount((prev) => prev + Number(e.target.value));
  };

  // 난이도 보통 handler
  const handleMediumLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel((prev) => {
      return {
        ...prev,
        medium: e.target.value,
      };
    });
    setProblemCount((prev) => prev + Number(e.target.value));
  };

  // 난이도 어려움 handler
  const handleDifficultLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel((prev) => {
      return {
        ...prev,
        difficult: e.target.value,
      };
    });
    setProblemCount((prev) => prev + Number(e.target.value));
  };

  // 유형 handler
  const handlerMultipleChoiceHander = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProblemType((prev) => {
      return {
        ...prev,
        multipleChoice: e.target.value,
      };
    });
  };

  const handlerSubjectiveHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProblemType((prev) => {
      return {
        ...prev,
        subject: e.target.value,
      };
    });
  };

  // const handleLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   console.log("eee", e.target.value);
  //   // setLevel(e.target.value);
  // };

  // const handleProblemType = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setProblemType(e.target.value);
  // };

  // const handleProblemCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setProblemCount(e.target.value);
  // };

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

    const { onlyProblemData, onlyAnswerData } = problemAndanswerSplit(response);
    const splitOnlyProblemData = problemSplit(onlyProblemData);

    const { promiseProblemsArray } =
      returnPromiseProblemsArray(splitOnlyProblemData);

    const result = await Promise.all(promiseProblemsArray);

    // for only 문제
    setPdfProblems(result);
    // for only 답
    setPdfAnswers(onlyAnswerData);

    setIsLoading(false);
    setIsProblemGenerate(true);
    setResponseProblems(response);
  };

  const handlePDFDownload = () => {
    setIsPDFDownload(true);
    setIsModal(true);
  };

  // console.log("pdfANswers", pdfAnswers, typeof pdfAnswers);

  useEffect(() => {
    updateInstance(
      <PDFDocument
        pdfProblems={pdfProblems}
        pdfAnswers={pdfAnswers}
        target={target}
        subject={subject}
        problemType={problemType}
      />
    );
  }, [responseProblems]);

  // 객관식 또는 주관식의 갯수가 생기는 순간, 나머지도 채워지게 하기
  // 중요한것은 난이도를 우선적으로 하고 나서 유형을 선택한다는 점은 일단
  useEffect(() => {
    if (problemType.multipleChoice !== "0") {
      setProblemType((prev) => {
        const calValue = problemCount - Number(problemType.subject);
        return {
          ...prev,
          subject: String(calValue),
        };
      });
    } else if (problemType.subject !== "0") {
    }
  }, []);

  //  아래처럼 되어야 한다
  // const sample = `\\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}`;

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="h-full w-full flex flex-col items-center bg-blue-100 ">
        <h1 className="font-bold text-4xl mt-40 mb-10">AI 맞춤형 학습</h1>
        <div className="flex flex-col gap-10 p-4 mb-10 ">
          {/* 대상 선택하기 */}
          <div className="flex flex-row gap-x-30 justify-between">
            <label className="font-bold text-2xl">학년</label>
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
          <div className="flex flex-row justify-between">
            <label className="font-bold text-2xl">과목</label>
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
            <label className="font-bold text-2xl">주제</label>
            <input
              className="border-2 w-[180px] text-center"
              onChange={handleTheme}
              value={theme}
            />
          </div>
          {/* 난이도 선택 */}
          <div className="flex flex-row justify-between">
            <label className="font-bold text-2xl">난이도</label>
            <div className="bg-amber-200 flex flex-col gap-y-2">
              <div className="flex justify-between">
                <label className="font-bold bg-red-200 mr-4">쉬움</label>
                <select
                  className="border-2 w-[180px] text-center"
                  onChange={handleEasyLevel}
                >
                  <option value="text-menu">문제갯수</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div className="flex justify-between">
                <label className="font-bold bg-red-200 mr-4">보통</label>
                <select
                  className="border-2 w-[180px] text-center"
                  onChange={handleMediumLevel}
                >
                  <option value="text-menu">문제갯수</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div>
                <label className="font-bold bg-red-200 mr-4">어려움</label>
                <select
                  className="border-2 w-[180px] text-center"
                  onChange={handleDifficultLevel}
                >
                  <option value="text-menu">문제갯수</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
            </div>

            {/* <select
              className="border-2 w-[180px] text-center"
              onChange={handleLevel}
            >
              <option value="text-menu">난이도 선택하기</option>
              <option value="easy">쉬움</option>
              <option value="medium">보통</option>
              <option value="difficulty">어려움</option>
            </select> */}
          </div>
          {/* 문제유형 선택 */}
          <div className="flex flex-row justify-between">
            <label className="font-bold text-2xl">유형</label>
            <div className="bg-amber-200 flex flex-col gap-y-2">
              <div className="flex justify-between">
                <label className="font-bold bg-red-200 mr-4">객관식</label>
                <select
                  className="border-2 w-[180px] text-center"
                  onChange={handlerMultipleChoiceHander}
                >
                  <option value="text-menu">문제갯수</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="15">20</option>
                  <option value="15">25</option>
                </select>
              </div>
              <div className="flex justify-between">
                <label className="font-bold bg-red-200 mr-4">주관식</label>
                <select
                  className="border-2 w-[180px] text-center"
                  onChange={handlerSubjectiveHandler}
                >
                  <option value="text-menu">문제갯수</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="15">20</option>
                  <option value="15">25</option>
                </select>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-row justify-between">
            <label className="font-bold text-2xl">문제유형</label>
            <select
              className="border-2 w-[180px] text-center"
              onChange={handleProblemType}
            >
              <option value="text-menu">문제 유형 선택하기</option>
              <option value="short-answer-question">객관식</option>
              <option value="essay-question">주관식</option>
            </select>
          </div> */}
          {/* 문제갯수 선택 */}
          {/* <div className="flex flex-row justify-between">
            <label className="font-bold text-2xl">문제갯수</label>
            <select
              className="border-2 w-[180px] text-center"
              onChange={handleProblemCount}
            >
              <option value="text-menu">문제 갯수 선택하기</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div> */}
        </div>
        <button
          className="border-2 bg-blue-800  text-sky-100 font-bold w-[200px] p-4 cursor-pointer hover:bg-blue-500"
          onClick={handleGenerateProblems}
        >
          문제 생성 하기
        </button>

        {isLoading && <p>문제를 생성하고 있습니다</p>}
        {!isLoading && isProblemGenerate && (
          <div className="flex flex-col mt-10">
            <p className="text-2xl">문제가 생성되었습니다</p>
            <button
              className="border-2 cursor-pointer bg-blue-400 cursor text-sky-100 font-bold  p-4"
              onClick={handlePDFDownload}
            >
              pdf로 문제 다운로드 받기
            </button>
          </div>
        )}
      </div>
      {/* isPDFDownload && instance.url */}
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
    </div>
  );
}

export default SectionTwo;
