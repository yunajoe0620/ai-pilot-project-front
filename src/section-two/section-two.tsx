import { useEffect, useState } from "react";
import { baseUrl } from "../api";
import useDeepSeekProblemGenerateHandler from "../hooks/use-deepSeek-problem-generate";
import useGPTProblemGenerateHandler from "../hooks/use-gpt-problem-generate-handler";
import { Level, ProblemType } from "../type";
import {
  formatQuestion,
  handleLevelSum,
  mixedFormatQuestion,
} from "../utils/section-two";

function SectionTwo() {
  // AI 모델
  const [model, setModel] = useState("");

  // 언어
  const [language, setLanguage] = useState("");

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
    shortAnswer: "0",
  });

  // 총 문제 갯수
  const [problemCount, setProblemCount] = useState(0);

  // pdf 파일 이름
  const [problemPdfFileName, setProblemPdfFileName] = useState("");
  const [answerPdfFileName, setAnswerPdfFileName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isProblemGenerate, setIsProblemGenerate] = useState(false);

  const [isMultipleHandlerMoving, setIsMultipleHandlerMoving] = useState(false);
  const [isShortAnswerHandlerMoving, setIsShortAnswerHandlerMoving] =
    useState(false);

  //  생성된 Prompt
  const [sentPrompt, setSentPrompt] = useState("");

  //  AI Output
  const [AIOutput, setAIOutput] = useState("");

  // AI모델 handler
  const handleAIModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };

  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleTarget = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTarget(e.target.value);
  };

  const handleSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };

  console.log("prompt", model, sentPrompt);

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
    const shortAnswerQuestion = Number(problemType.shortAnswer);

    if (valueNumber + shortAnswerQuestion > problemCount) {
      alert("총 문제보다 문제수가 커질 수가 없습니다");
      return;
    }
    // 객관식 유형 true로
    setIsMultipleHandlerMoving(true);
    // 주관식 유형 false로
    setIsShortAnswerHandlerMoving(false);
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
    const multipleChoiceQuestion = Number(problemType.multipleChoice);

    if (valueNumber + multipleChoiceQuestion > problemCount) {
      alert("총 문제보다 문제수가 커질 수가 없습니다");
      return;
    }
    // 객관식 유형 false로
    setIsMultipleHandlerMoving(false);
    // 주관식 유형 true
    setIsShortAnswerHandlerMoving(true);
    setProblemType((prev) => {
      return {
        ...prev,
        shortAnswer: e.target.value,
      };
    });
  };

  const { handleChatGPTGenerateProblems } = useGPTProblemGenerateHandler(
    setIsLoading,
    setIsProblemGenerate,
    setProblemPdfFileName,
    setAnswerPdfFileName,
    setAIOutput,
    model,
    sentPrompt
  );

  // deek seek로 문제 생성하기
  const { handleDeepSeekGenerateProblems } = useDeepSeekProblemGenerateHandler(
    setIsLoading,
    setIsProblemGenerate,
    setProblemPdfFileName,
    setAnswerPdfFileName,
    setAIOutput,
    model,
    sentPrompt
  );

  const handlePDFDownload = () => {
    window.open(`${baseUrl}/pdf/${problemPdfFileName}.pdf`);
    window.open(`${baseUrl}/pdf/${answerPdfFileName}.pdf`);
  };

  // const handleMoreProblem = (e: ChangeEvent<HTMLInputElement>) => {
  //   setNewTopic(e.target.value);
  // };

  useEffect(() => {
    // 객관식이 움직였을때 주관식 유형을 자동으로 계산한다
    if (isMultipleHandlerMoving) {
      const calValue = problemCount - Number(problemType.multipleChoice);
      setProblemType(() => {
        return {
          multipleChoice: String(problemType.multipleChoice),
          shortAnswer: String(calValue),
        };
      });
    }
    // 주관식이 움직였을때 객관식 유형을 자동으로 계산한다.
    if (isShortAnswerHandlerMoving) {
      const calValue = problemCount - Number(problemType.shortAnswer);
      setProblemType(() => {
        return {
          multipleChoice: String(calValue),
          shortAnswer: String(problemType.shortAnswer),
        };
      });
    }
  }, [problemType.multipleChoice, problemType.shortAnswer]);

  // handle Prompt
  const handlePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSentPrompt(e.target.value);
  };

  // 총갯수 합
  useEffect(() => {
    const result = handleLevelSum(level);
    setProblemCount(result);
  }, [level.easy, level.medium, level.difficult]);

  // for prompt 렌더링
  useEffect(() => {
    let promptData;
    // 객관식과 주관식을 mix했을 때
    if (problemType.multipleChoice !== "0" && problemType.shortAnswer !== "0") {
      promptData = mixedFormatQuestion({
        language,
        target,
        subject,
        theme,
        level,
        problemType,
        problemCount,
      });
    } else {
      // 객관식만 또는 주관식만 썼을 때
      promptData = formatQuestion({
        language,
        target,
        subject,
        theme,
        level,
        problemType,
        problemCount,
      });
    }

    if (typeof promptData === "string") {
      setSentPrompt(promptData);
    }
  }, [
    language,
    target,
    subject,
    theme,
    level,
    problemType,
    problemCount,
    sentPrompt,
  ]);

  return (
    <div className="flex flex-col items-center h-full">
      <div className="h-full w-full flex flex-col items-center bg-blue-100 ">
        <h1 className="font-bold text-4xl mt-40 mb-10">AI 맞춤형 학습</h1>
        <div className="flex flex-col gap-10 p-4 mb-10 ">
          {/* AI MODEL */}
          <div className="flex flex-row gap-x-30 justify-between">
            <label className="font-bold text-2xl">AI 모델</label>
            <select
              className="border-2 w-[180px] text-center"
              onChange={handleAIModel}
            >
              <option value="text-menu">대상선택하기</option>
              <option value="gpt40Mini">gpt-4o-mini</option>
              <option value="gpt40">gpt-4o</option>
              <option value="deepSeekV3">deep-seek-v3</option>
              <option value="deepSeekR1">deep-seek-r1</option>
            </select>
          </div>
          {/* 언어 */}
          <div className="flex flex-row gap-x-30 justify-between">
            <label className="font-bold text-2xl">언어</label>
            <select
              className="border-2 w-[180px] text-center"
              onChange={handleLanguage}
            >
              <option value="text-menu">대상선택하기</option>
              <option value="korean">한국어</option>
              <option value="english">영어</option>
            </select>
          </div>
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
                  value={problemType.shortAnswer}
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
        <div className="flex flex-col mt-10 w-full">
          <p className="text-2xl">전달된 prompt</p>
          <textarea
            value={sentPrompt}
            onChange={handlePrompt}
            className="resize-none  w-full h-48 p-2 border border-gray-300 rounded-md bg-white"
          />
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

        {/* AI 아웃풋 */}
        {!isLoading && isProblemGenerate && (
          <div className="flex flex-col mt-10 w-full">
            <p className="text-2xl">AI output</p>
            <textarea
              readOnly
              value={AIOutput}
              className="resize-none  w-full h-48 p-2 border border-gray-300 rounded-md bg-white"
            />
          </div>
        )}

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
        {/* {isProblemGenerate && (
          <div>
            <label>추가 토픽 적기</label>
            <input value={newTopic} onChange={handleMoreProblem} />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default SectionTwo;
