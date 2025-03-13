import "katex/dist/katex.min.css";
import { Item, QuestionItem } from "../../schemas/problem";
import {
  EnglishMixedPrompt,
  EnglishSimplePrompt,
  KoreanMixedPrompt,
  KoreanSimplePrompt,
} from "../prompt";

// 객관식 또는 주관식이 하나만 설정하였을 때
export const formatQuestion = (data: Item) => {
  switch (data.language) {
    case "korean":
      return KoreanSimplePrompt(data);
    case "english": {
      return EnglishSimplePrompt(data);
    }
    default:
      undefined;
  }
};

// 문제 유형을 주관식과 객관식 섞어서 설정하였을때
export const mixedFormatQuestion = (data: Item) => {
  switch (data.language) {
    case "korean":
      return KoreanMixedPrompt(data);
    case "english": {
      return EnglishMixedPrompt(data);
    }
    default:
      undefined;
  }
};

export const formatExtraQuestion = (data: QuestionItem) => {
  const { target, subject, theme, level, problemType, problemCount } = data;

  const prompt = `When the subject is math, apply the LaTeX format only. create problems for a grade level of ${targetObject[target]} and a subject of ${subjectObject[subject]} with the theme ${theme}.   
  Create a total of ${problemCount} problems, divided by difficulty (easy, medium, difficult), with the number of ${problemType.multipleChoice} multiple-choice problems 
  and the number of ${problemType.shortAnswer} short-answer problems.
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
  Return the question and answer in Korean      
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

export const handleLevelSum = (levelObject: any) => {
  let sum =
    Number(levelObject.easy) +
    Number(levelObject.medium) +
    Number(levelObject.difficult);
  return sum;
};
