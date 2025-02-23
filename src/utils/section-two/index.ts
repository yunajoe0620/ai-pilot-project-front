import * as htmlToImage from "html-to-image";
import KaTeX from "katex";
import "katex/dist/katex.min.css";
import { QuestionItem } from "../../schemas/problem";

export const formatQuestion = (data: QuestionItem) => {
  const { target, subject, theme, level, problemType, problemCount } = data;
  return `학년수준이 ${targetObject[target]}이고 과목이 ${subjectObject[subject]}이며 ${theme}이라는 주제에 해당하는 ${levelObject[level]}수준의 문제를 ${problemTypeObject[problemType]}의 유형으로 문제를 
  ${problemCount}개 만들어줘 한문제가 끝날 때 마다 ***** 기호를 넣어줘. 답은 맨 마지막에 한번에 알려줘. ****answer**** 이라는 기호를 답 전에 알려죠. 답을 해당문제-답 (ex. 1-A) 형식으로 알려줘 다른말은 하지 말고 문제랑 답만 알려죠.
  그리고 행렬은 \begin{pmatrix} 3 & 1 \\ 2 & 4 \\end{pmatrix} 구조로 보내줘. 
  `;
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

export const problemSplit = (problems: any) => {
  if (!problems) return [];
  const arr = problems.split("*****");
  return arr;
};

const convertStringToImage = async (value: any) => {
  const div = document.createElement("div");
  div.innerHTML = `<span id="latex-container" style="width: 200px; height: 60px;">${KaTeX.renderToString(
    _TEST_removeKATAXTag(value)
  )}</span>`;

  document.body.appendChild(div);

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
  const prefixRegex = /\\\(/g; // \(
  const suffixRegex = /\\\)/g; // \)

  const result = item.replace(prefixRegex, "").replace(suffixRegex, "");

  return result;
};

const initItemArray = async (item: any) => {
  // console.log("item", item);
  // 1. 행렬 \(\begin{pmatrix} 3 & 1 \\ 2 & 4 \end{pmatrix}\)의 행렬식 값은 얼마인가?
  item = removeParentheses(item);
  // \(\begin{pmatrix} 3 & 1 \\ 2 & 4 \end{pmatrix}\)
  // \begin{pmatrix} 3 & 1 \\ 2 & 4 \end{pmatrix} + \begin{pmatrix} 1 & 2 \\ 3 & 0 \end{pmatrix}

  //
  const KATEX_REGEX = /(<KATEX>.*<\/KATEX>)/;
  try {
    const replaceItem = _TEST_transformGPTKatexToKatex({ targetString: item });

    const array = replaceItem.split(KATEX_REGEX);
    const result = await Promise.all(
      array.map(async (data) => {
        const isFormula = KATEX_REGEX.test(data);
        console.log("isFormula", isFormula);
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

// export const transformLatexString = (str1: string) => {
//   const regex = /\\(\\\()?\\begin{pmatrix}([^\\]*?)\\end{pmatrix}(\\\))?/g;

//   const str2 = str1.replace(
//     regex,
//     "\\\\\\begin{pmatrix}$2\\\\\\\\end{pmatrix}"
//   );
//   return str2;
// };

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

export const splitItem = (item: string) => {
  if (!item)
    return {
      question: "",
      choices: "",
    };

  const splitItems = item.split("-------choices------");

  const question = splitItems[0];
  const choices = splitItems[1];

  return {
    question,
    choices,
  };
};
