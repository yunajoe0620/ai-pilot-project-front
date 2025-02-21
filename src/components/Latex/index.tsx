import { useState } from "react";
import { InlineMath } from "react-katex";

// LaTeX(pronounced "Lay-tech" 또는 "Lah-tech")는 주로 수학, 과학, 공학, 기술적인 문서 작성에서
// 사용되는 문서 준비 시스템이자 마크업 언어입니다. LaTeX는 주로 복잡한 수식, 표, 그래픽 등을 포함한
// 고품질의 인쇄물을 생성하는 데 매우 유용합니다
interface LatexProps {
  latexString: string;
}

function Latex() {
  //  변환 Latex값이 있어야 한다
  const [isConvertedLatexString, setISConvertedLatexString] = useState(
    "\\begin{bmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{bmatrix}"
  );

  return (
    <>
      <input value={isConvertedLatexString} />
      <InlineMath math={isConvertedLatexString} />;
    </>
  );
}

export default Latex;
