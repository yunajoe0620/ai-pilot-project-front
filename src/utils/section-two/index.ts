import * as htmlToImage from "html-to-image";
import KaTeX from "katex";
import "katex/dist/katex.min.css";
import { QuestionItem } from "../../schemas/problem";
export const formatQuestion = (data: QuestionItem) => {
  const { target, subject, theme, level, problemType, problemCount } = data;
  const prompt = `학년 수준이 ${targetObject[target]}이고 과목이  ${subjectObject[subject]}이며 ${theme}문제를 
  난이도가 쉬운거 ${level.easy}개, 보통 ${level.medium}개, 어려운거 ${level.difficult}개 만들어줘. 
  총 ${problemCount}개 만들어주는데, 그 중 객관식 유형${problemType.multipleChoice}개, 주관식 유형 ${problemType.subject}개 만들어줘 
  난이도 별로 나눠서 문제를 만들어줘. 정답은 맨 마지막에 한번에 알려줘`;
  return prompt;
};

type ObjectType = {
  [key: string]: string;
};

export const targetObject: ObjectType = {
  elementary: "초등학교",
  middleschool: "중학교",
  highschool: "고등학교",
  university: "대학교",
};

export const subjectObject: ObjectType = {
  math: "수학",
  english: "영어",
  science: "과학",
  history: "역사",
};

export const levelObject: ObjectType = {
  easy: "쉬움",
  medium: "보통",
  difficulty: "어려움",
};

export const problemTypeObject: ObjectType = {
  "short-answer-question": "객관식",
  "essay-question": "주관식",
};

export const problemAndanswerSplit = (problems: any) => {
  if (!problems)
    return {
      onlyProblemData: [],
      onlyAnswerData: [],
    };
  const result = problems.response;
  const splitResultData = result.split("****answer****");
  const onlyProblemData = splitResultData[0];
  const onlyAnswerData = splitResultData[1];
  return {
    onlyProblemData,
    onlyAnswerData,
  };
};

export const problemSplit = (problems: string) => {
  if (!problems) return [];
  const arr = problems.split("*****");
  return arr;
};

const convertStringToImage = async (value: string) => {
  const root = document.getElementById("image");
  const div = document.createElement("div");

  div.innerHTML = `<span id="latex-container" style="font-size: 40px;">${KaTeX.renderToString(
    _TEST_removeKATAXTag(value)
  )}</span>`;

  root?.appendChild(div);

  try {
    const canvas = await htmlToImage.toCanvas(div);
    const dataUrl = canvas.toDataURL();
    return dataUrl;
  } catch (error) {
    console.error("Error converting HTML to image:", error);
    return "";
  }
};

export const removeParentheses = (item: string) => {
  const prefixRegex = /\\\(/g; // \( 제거하기
  const suffixRegex = /\\\)/g; // \)  제거하기
  const result = item.replace(prefixRegex, "").replace(suffixRegex, "");
  return result;
};

export const removeBrackets = (item: string) => {
  const prefixRegex = /\\\[/g; // \[ 제거하기
  const suffixRegex = /\\\\]/g; // \]  제거하기
  const result = item.replace(prefixRegex, "").replace(suffixRegex, "");
  return result;
};

const initItemArray = async (item: string) => {
  // 1. 행렬 \(\begin{pmatrix} 3 & 1 \\ 2 & 4 \end{pmatrix}\)의 행렬식 값은 얼마인가? 잘됨
  // A = \(\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\) 안됨
  // A) \(\begin{pmatrix} 10 & 12 \\ 14 & 16 \end{pmatrix}\)  잘됨
  //
  // 아래도 잘 안됨
  // \[
  //   A = \begin{pmatrix}
  //   1 & 2 \\
  //   3 & 4 \\
  //   5 & 6
  //   \end{pmatrix}
  //   \]

  // 아래처럼 표시됨
  //   <KATEX>\begin{pmatrix}
  // 2 & 3
  // 1 & 4
  // \end{pmatrix}</KATEX>
  // \]
  item = removeParentheses(item);
  item = removeBrackets(item);

  const KATEX_REGEX = /(<KATEX>.*<\/KATEX>)/;
  try {
    const replaceItem = _TEST_transformGPTKatexToKatex({ targetString: item });

    const array = replaceItem.split(KATEX_REGEX);
    const result = await Promise.all(
      array.map(async (data) => {
        const isFormula = KATEX_REGEX.test(data);
        const text = isFormula ? await convertStringToImage(data) : data;
        return {
          type: isFormula ? "image" : "text",
          value: text,
        };
      })
    );
    return result;
  } catch (e) {
    return [];
  }
};

export const returnPromiseProblemsArray = (onlyProblemsArray: string[]) => {
  const promiseProblemsArray = onlyProblemsArray.map(async (data: string) => {
    return await initItemArray(data);
  });

  return {
    promiseProblemsArray,
  };
};

export const replaceParentheses = (text: string) => {
  return text.replace(/\\\(|\\\)/g, "");
};

export const _TEST_transformGPTKatexToKatex = ({
  targetString,
}: {
  targetString: string;
}) => {
  const prefixRegex = /\\begin{pmatrix}/g;
  const suffixRegex = /\\end{pmatrix}/g;

  const prefixReplaced = targetString.replace(
    prefixRegex,
    "<KATEX>\\begin{pmatrix}"
  );
  const result = prefixReplaced.replace(suffixRegex, "\\end{pmatrix}</KATEX>");
  return result;
};
export const _TEST_removeKATAXTag = (value: string) => {
  const prefixRegex = /<KATEX>/g;
  const suffixRegex = /<\/KATEX>/g;

  const prefixReplaced = value.replace(prefixRegex, "");
  const result = prefixReplaced.replace(suffixRegex, "");
  return result;
};

export const handleLevelSum = (levelObject: any) => {
  let sum =
    Number(levelObject.easy) +
    Number(levelObject.medium) +
    Number(levelObject.difficult);
  return sum;
};
