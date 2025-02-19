import { QuestionItem } from "../../schemas/problem";

export const formatQuestion = (data: QuestionItem) => {
  const { target, subject, theme, level, problemType, problemCount } = data;
  return `학년수준이 ${targetObject[target]}이고 과목이 ${subjectObject[subject]}이며 ${theme}이라는 주제에 해당하는 ${levelObject[level]}수준의 문제를 ${problemTypeObject[problemType]}의 유형으로 문제를 ${problemCount}개 만들어줘 한문제가 끝날 때 마다 ***** 기호를 넣어줘. 답은 맨 마지막에 한번에 알려줘. 다른말은 하지 말고 문제랑 답만 알려죠`;
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

export const problemSplit = (problems: any) => {
  if (!problems) return;
  const result = problems.response;
  const arr = result.split("*****");
  console.log("Arr ====>>>>>>>>>>", arr);
  // console.log("arr", arr);
  // console.log("firstEle", arr[0], arr[1]);
  return arr;
};
