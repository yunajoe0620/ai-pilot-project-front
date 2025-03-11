import { ChangeEvent, useEffect, useState } from "react";
import { baseUrl } from "../api";
import useDeepSeekProblemGenerateHandler from "../hooks/use-deepSeek-problem-generate";
import useGPTProblemGenerateHandler from "../hooks/use-gpt-problem-generate-handler";
import { Level, ProblemType } from "../type";
import { handleLevelSum } from "../utils/section-two";

function SectionTwo() {
  // 대상
  const [target, setTarget] = useState("대상선택하기");
  // 과목
  const [subject, setSubject] = useState("과목선택하기");
  //   주제
  const [theme, setTheme] = useState("");

  // 난이도
  const [level, setLevel] = useState<Level>({
    easy: "0",
    medium: "0",
    difficult: "0",
  });
  //  문제유형
  const [problemType, setProblemType] = useState<ProblemType>({
    multipleChoice: "0",
    subject: "0",
  });

  // 총 문제 갯수
  const [problemCount, setProblemCount] = useState(0);

  // pdf 파일 이름
  const [problemPdfFileName, setProblemPdfFileName] = useState("");

  const [answerPdfFileName, setAnswerPdfFileName] = useState("");

  // pdf hooks
  // const [instance, updateInstance] = usePDF({
  //   document: (
  //     <PDFDocument
  //       // pdfProblems={pdfProblems}
  //       // pdfAnswers={pdfAnswers}
  //       target={target}
  //       subject={subject}
  //       problemType={problemType}
  //     />
  //   ),
  // });

  // const modalRef = useRef<HTMLIFrameElement>(null);

  // const handleModalClose = () => {
  //   setIsModal(false);
  // };

  const [isLoading, setIsLoading] = useState(false);
  const [isProblemGenerate, setIsProblemGenerate] = useState(false);

  // for 새로운 문제 topic
  const [newTopic, setNewTopic] = useState("");

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
  };

  // 난이도 보통 handler
  const handleMediumLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel((prev) => {
      return {
        ...prev,
        medium: e.target.value,
      };
    });
  };

  // 난이도 어려움 handler
  const handleDifficultLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel((prev) => {
      return {
        ...prev,
        difficult: e.target.value,
      };
    });
  };

  // 객관식 유형 handler
  const handlerMultipleChoiceHander = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const valueNumber = Number(e.target.value);
    if (valueNumber > problemCount) {
      alert("총 문제보다 문제수가 커질 수가 없습니다");
      return;
    }
    setProblemType((prev) => {
      return {
        ...prev,
        multipleChoice: e.target.value,
      };
    });
  };

  // 주관식 유형 handler
  const handlerSubjectiveHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const valueNumber = Number(e.target.value);
    if (valueNumber > problemCount) {
      alert("총 문제보다 문제수가 커질 수가 없습니다");
      return;
    }
    setProblemType((prev) => {
      return {
        ...prev,
        subject: e.target.value,
      };
    });
  };

  const { handleChatGPTGenerateProblems } = useGPTProblemGenerateHandler(
    setIsLoading,
    setIsProblemGenerate,
    setProblemPdfFileName,
    setAnswerPdfFileName,
    target,
    subject,
    theme,
    level,
    problemType,
    problemCount,
    newTopic
  );

  // deek seek로 문제 생성하기
  const { handleDeepSeekGenerateProblems } = useDeepSeekProblemGenerateHandler(
    setIsLoading,
    setIsProblemGenerate,
    setProblemPdfFileName,
    setAnswerPdfFileName,
    target,
    subject,
    theme,
    level,
    problemType,
    problemCount,
    newTopic
  );
  // http://192.168.0.20:5000/
  const handlePDFDownload = () => {
    // window.open(`http://localhost:5000/pdf/${problemPdfFileName}.pdf`);
    // window.open(`http://localhost:5000/pdf/${answerPdfFileName}.pdf`);
    window.open(`${baseUrl}/pdf/${problemPdfFileName}.pdf`);
    window.open(`${baseUrl}/pdf/${answerPdfFileName}.pdf`);
  };

  const handleMoreProblem = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTopic(e.target.value);
  };

  // useEffect(() => {
  //   updateInstance(
  //     <PDFDocument
  //       // pdfProblems={pdfProblems}
  //       // pdfAnswers={pdfAnswers}
  //       target={target}
  //       subject={subject}
  //       problemType={problemType}
  //     />
  //   );
  // }, []);

  useEffect(() => {
    if (problemType.multipleChoice !== "0") {
      setProblemType((prev) => {
        const calValue = problemCount - Number(prev.multipleChoice);
        return {
          ...prev,
          subject: String(calValue),
        };
      });
    } else if (problemType.subject !== "0") {
      setProblemType((prev) => {
        const calValue = problemCount - Number(problemType.multipleChoice);
        return {
          ...prev,
          multipleChoice: String(calValue),
        };
      });
    }
  }, [problemCount, problemType.multipleChoice, problemType.subject]);

  // 총갯수 합
  useEffect(() => {
    const result = handleLevelSum(level);
    setProblemCount(result);
  }, [level.easy, level.medium, level.difficult]);

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="h-full w-full flex flex-col items-center bg-blue-100 ">
        <h1 className="font-bold text-4xl mt-40 mb-10">AI 맞춤형 학습</h1>
        <div className="flex flex-col gap-10 p-4 mb-10 ">
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
          <div className="flex flex-row justify-between">
            <label className="font-bold text-2xl">주제</label>
            <input
              className="border-2 w-[180px] text-center"
              onChange={handleTheme}
              value={theme}
            />
          </div>
          <div className="flex flex-row justify-between">
            <label className="font-bold text-2xl">난이도</label>
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between">
                <label className="font-bold bg-red-200 mr-4">쉬움</label>
                <select
                  className="border-2 w-[180px] text-center"
                  onChange={handleEasyLevel}
                >
                  <option value="0">0</option>
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
                  <option value="0">0</option>
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
                  <option value="0">0</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <label className="font-bold text-2xl">유형</label>
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between">
                <label className="font-bold bg-red-200 mr-4">객관식</label>
                <select
                  value={problemType.multipleChoice}
                  className="border-2 w-[180px] text-center"
                  onChange={handlerMultipleChoiceHander}
                >
                  <option value="0">0</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
              </div>
              <div className="flex justify-between">
                <label className="font-bold bg-red-200 mr-4">주관식</label>
                <select
                  className="border-2 w-[180px] text-center"
                  onChange={handlerSubjectiveHandler}
                  value={problemType.subject}
                >
                  <option value="0">0</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <button
          className="border-2 bg-blue-800  text-sky-100 font-bold  p-4 cursor-pointer hover:bg-blue-500"
          onClick={handleChatGPTGenerateProblems}
        >
          Chat GPT 로 문제 생성 하기
        </button>
        <button
          className="border-2 bg-blue-800  text-sky-100 font-bold  p-4 cursor-pointer hover:bg-blue-500"
          onClick={handleDeepSeekGenerateProblems}
        >
          Deep Seek 로 문제 생성 하기
        </button>
        {isLoading && <p>문제를 생성하고 있습니다</p>}
        {!isLoading && isProblemGenerate && (
          <div className="flex flex-col mt-10">
            <p className="text-2xl">문제가 생성되었습니다</p>
            <button
              className="border-2 cursor-pointer bg-blue-400 cursor text-sky-100 font-bold  p-4"
              onClick={handlePDFDownload}
            >
              pdf로 문제와 해설 다운로드 받기
            </button>
          </div>
        )}
        {/* 문제 생성 후 추가로 문제 받기 */}
        {isProblemGenerate && (
          <div>
            <label>추가 토픽 적기</label>
            <input value={newTopic} onChange={handleMoreProblem} />
          </div>
        )}
      </div>
      {/* {isModal && (
        <ModalComponent
          component={
            <Iframe
              url={instance.url}
              modalRef={modalRef}
              handleModalClose={handleModalClose}
            />
          }
        />
      )} */}
    </div>
  );
}

export default SectionTwo;
