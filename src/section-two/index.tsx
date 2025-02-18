import { useState } from "react";
import { createQuestion } from "../actions/get-problems";

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

  const handleGenerateProblems = async () => {
    const response = await createQuestion({
      target,
      subject,
      theme,
      level,
      problemType,
    });

    console.log("response ", response);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="h-full w-full flex flex-col items-center bg-gray-100">
        <h1 className="font-bold">AI 맞춤형 학습</h1>
        <div>
          {/* 대상 선택하기 */}
          <div className="flex flex-row gap-16">
            <label>학생 학년 및 선택 수준</label>
            <select className="border-2" onChange={handleTarget}>
              <option value="text-menu">대상선택하기</option>
              <option value="elementary">초등학교</option>
              <option value="middleschool">중학교</option>
              <option value="highschool">고등학교</option>
              <option value="university">대학교</option>
            </select>
          </div>
          {/* 과목선택 */}
          <div className="flex flex-row gap-16">
            <label>과목</label>
            <select className="border-2" onChange={handleSubject}>
              <option value="text-menu">과목 선택하기</option>
              <option value="math">수학</option>
              <option value="english">영어</option>
              <option value="science">과학</option>
              <option value="history">역사</option>
            </select>
          </div>
          {/* 주제선택 */}
          <div className="flex flex-row gap-16">
            <label>주제</label>
            <input className="border-2" onChange={handleTheme} value={theme} />
          </div>
          {/* 난이도 선택 */}
          <div className="flex flex-row gap-16">
            <label>난이도</label>
            <select className="border-2" onChange={handleLevel}>
              <option value="text-menu">난이도 선택하기</option>
              <option value="easy">쉬움</option>
              <option value="medium">보통</option>
              <option value="difficulty">어려움</option>
            </select>
          </div>
          {/* 문제유형 선택 */}
          <div className="flex flex-row gap-16">
            <label>문제유형</label>
            <select className="border-2" onChange={handleProblemType}>
              <option value="text-menu">문제 유형 선택하기</option>
              <option value="short-answer-question">객관식</option>
              <option value="essay-question">주관식</option>
            </select>
          </div>
        </div>
      </div>
      <button
        className="border-2 bg-gray-700 text-amber-100 w-[200px] p-4"
        onClick={handleGenerateProblems}
      >
        문제 생성 하기
      </button>
    </div>
  );
}

export default SectionTwo;
