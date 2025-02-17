import { useState } from "react";

function SectionTwo() {
  // 대상
  const [target, setTarget] = useState();
  // 과목
  const [subject, setSubject] = useState();
  //   주제
  const [theme, setTheme] = useState();
  //   난이도
  const [level, setLevel] = useState();
  //   문제유형
  const [problemType, setProblemType] = useState();
  return (
    <div>
      <h1 className="font-bold">맞춤형 학습</h1>
      <div>
        {/* 대상 선택하기 */}
        <div>
          <select>
            <option disabled selected>
              대상 선택하기
            </option>
            <option value="elementary">초등학교</option>
            <option value="middle">중학교</option>
            <option value="highschool">고등학교</option>
            <option value="university">대학교</option>
          </select>
        </div>
        {/* 과목선택 */}
        <div>
          <label>과목</label>
          <input value={subject} />
        </div>
        {/* 주제선택 */}
        <div>
          <label>주제</label>
          <input value={theme} />
        </div>
        {/* 난이도 선택 */}
        <div>
          <label>난이도</label>
          <input value={level} />
        </div>
        {/* 문제유형 선택 */}
        <div>
          <label>문제유형</label>
          <input value={problemType} />
        </div>
      </div>
    </div>
  );
}

export default SectionTwo;
