import * as htmlToImage from "html-to-image";
import KaTeX from "katex";
import "katex/dist/katex.min.css";
import { QuestionItem } from "../../schemas/problem";
export const formatQuestion = (data: QuestionItem) => {
  const { target, subject, theme, level, problemType, problemCount } = data;

  const prompt = `When the subject is math, apply the LaTeX format only. create problems for a grade level of ${targetObject[target]} and a subject of ${subjectObject[subject]} with the theme ${theme}.   
  Create a total of ${problemCount} problems, divided by difficulty (easy, medium, difficult), with the number of ${problemType.multipleChoice} multiple-choice problems 
  and the number of ${problemType.subject} short-answer problems.
  Create ${level.easy} easy problems, ${level.medium} medium problems, and ${level.difficult} difficult problems. 
  Please insert \\\\\\\\\\\\ after each question and \\noindent before each question. 
  Please insert \\\\\\\\\\\\\\\\ after each answer. 
  Please insert \\\\\\\\ after the problem description when a formula appears."
  Provide the answers at the very end all at once. 
  please make the easy, medium, and difficult proplems seperately.    
  Don't say anything except for the questions and answer
  The problems will be shown with their numbers and the problem statement only.  
  When providing the answer, please insert *****answer***** before the answer.    
  Please provide the answer along with the explanation.
  `;
  return prompt;
};

export const formatExtraQuestion = (data: QuestionItem) => {
  const { target, subject, theme, level, problemType, problemCount } = data;

  const prompt = `When the subject is math, apply the LaTeX format only. create problems for a grade level of ${targetObject[target]} and a subject of ${subjectObject[subject]} with the theme ${theme}.   
  Create a total of ${problemCount} problems, divided by difficulty (easy, medium, difficult), with the number of ${problemType.multipleChoice} multiple-choice problems 
  and the number of ${problemType.subject} short-answer problems.
  Create ${level.easy} easy problems, ${level.medium} medium problems, and ${level.difficult} difficult problems. 
  Please insert \\\\\\\\\\\\ after each question and \\noindent before each question. 
  Please insert \\\\\\\\\\\\\\\\ after each answer. 
  Please insert \\\\\\\\ after the problem description when a formula appears."
  Provide the answers at the very end all at once. 
  please make the easy, medium, and difficult proplems seperately.    
  Don't say anything except for the questions and answer
  The problems will be shown with their numbers and the problem statement only.  
  When providing the answer, please insert *****answer***** before the answer.    
  Please provide the answer along with the explanation.
  `;
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
