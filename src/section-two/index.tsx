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
      <h1>맞춤형 학습</h1>
      <div>
        <input />
        <input />
        <input />
        <input />
        <input />
      </div>
    </div>
  );
}

export default SectionTwo;
