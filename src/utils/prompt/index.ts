import { Item } from "../../schemas/problem";

export const AIModelMap: Record<string, string> = {
  gpt40Mini: "gpt-4o-mini",
  gpt40: "gpt-4o",
  deepSeekV3: "deepseek-chat",
  deepSeekR1: "deepseek-reasoner",
};
const KoreanGradeMap: Record<string, string> = {
  elementary: "초등학교",
  middleschool: "중학교",
  highschool: "고등학교",
  university: "대학교",
};

const KoreanSubjectMap: Record<string, string> = {
  math: "수학",
  english: "영어",
  science: "과학",
  history: "역사",
};

const KoreanProblemType: Record<string, string> = {
  multipleChoice: "객관식",
  shortAnswer: "주관식",
};

export const KoreanSimplePrompt = (data: Item) => {
  let problemType =
    data.problemType.multipleChoice !== "0" ? "multipleChoice" : "shortAnswer";
  let problemTypeNumbers =
    data.problemType.multipleChoice !== "0"
      ? data.problemType.multipleChoice
      : data.problemType.shortAnswer;
  const prompt = `${KoreanSubjectMap[data.subject]} 과목에서 ${
    KoreanGradeMap[data.target]
  } 학교 수준의 ${data.theme} 주제에 대해 ${problemTypeNumbers}개의 ${
    KoreanProblemType[problemType]
  } 문제를 생성하고, 
  ${data.level.easy}개의 쉬운 문제, ${
    data.level.medium
  }개의 중간 난이도 문제, ${data.level.difficult}개의 어려운 문제를 보내세요. 
  주관식 문제의 형식은 다음과 같습니다.
  쉬움: \\\\\\\\  
  1. Question  \\\\\\\\
  2. Question  \\\\\\\\
  3. Question  \\\\\\\\
   .......... \\\\\\\\

  중간: \\\\\\\\
  1. Question \\\\\\\\
  2. Question  \\\\\\\\
  3. Question  \\\\\\\\    
  .......... \\\\\\\\   

  어려움: \\\\\\\\
  1. Question \\\\\\\\
  2. Question \\\\\\\\
  3. Question \\\\\\\\    
  .......... \\\\\\\\

  
 답이 나오기 전에 *****answer*****를 한 번만 삽입해주세요.
 답과 함께 설명을 제공해주세요.
 정답은 다음 형식으로 보내주세요.

  쉬움: \\\\\\\\ 
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  중간: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  어려움: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\   

  객관식 문제의 형식은 다음과 같습니다.  
  쉬움: \\\\\\\\  
  1. Question  \\\\\\\\
   a) option \\\\\\\\
  2. Question  \\\\\\\\
   b) option \\\\\\\\
  3. Question  \\\\\\\\
   c) option \\\\\\\\

   .......... \\\\\\\\

  중간: \\\\\\\\
  1. Question \\\\\\\\
   a) option \\\\\\\\
  2. Question  \\\\\\\\
   b) option \\\\\\\\
  3. Question  \\\\\\\\
   c) option \\\\\\\\    
  .......... \\\\\\\\   

  어려움: \\\\\\\\
  1. Question \\\\\\\\
   a) option \\\\\\\\
  2. Question \\\\\\\\
   b) option \\\\\\\\
  3. Question \\\\\\\\ 
  c) option \\\\\\\\    
  .......... \\\\\\\\   
    
  답이 나오기 전에 *****answer*****를 한 번만 삽입해주세요.
  답과 함께 설명을 제공해주세요.
  정답은 다음 형식으로 보내주세요.

  쉬움: \\\\\\\\ 
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  중간: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  어려움: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\   

  `;
  return prompt;
};

export const EnglishSimplePrompt = (data: Item) => {
  let problemType =
    data.problemType.multipleChoice !== "0" ? "multiple-choice" : "shortAnswer";
  let problemTypeNumbers =
    data.problemType.multipleChoice !== "0"
      ? data.problemType.multipleChoice
      : data.problemType.shortAnswer;
  const prompt = `Create ${problemTypeNumbers} ${problemType} questions on the topic of ${data.theme} in ${data.subject} at the ${data.target} school level,
  and send ${data.level.easy} easy, send ${data.level.medium} medium, and  ${data.level.difficult} difficult questions.
  The format for short-answer questions is as follows
  Easy: \\\\\\\\  
  1. Question  \\\\\\\\
  2. Question  \\\\\\\\
  3. Question  \\\\\\\\
   .......... \\\\\\\\

  Medium: \\\\\\\\
  1. Question \\\\\\\\
  2. Question  \\\\\\\\
  3. Question  \\\\\\\\    
  .......... \\\\\\\\   

  Difficult: \\\\\\\\
  1. Question \\\\\\\\
  2. Question \\\\\\\\
  3. Question \\\\\\\\    
  .......... \\\\\\\\

  
  Before the answers comes out, please insert *****answer***** just once."
  Please provide the answer along with the explanation.  
  Send the correct answers in the following format

  Easy: \\\\\\\\ 
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  Medium: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  Difficult: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\   

  The format for multiple-choice questions is as follows
    Easy: \\\\\\\\  
  1. Question  \\\\\\\\
   a) option \\\\\\\\
  2. Question  \\\\\\\\
   b) option \\\\\\\\
  3. Question  \\\\\\\\
   c) option \\\\\\\\

   .......... \\\\\\\\

  Medium: \\\\\\\\
  1. Question \\\\\\\\
   a) option \\\\\\\\
  2. Question  \\\\\\\\
   b) option \\\\\\\\
  3. Question  \\\\\\\\
   c) option \\\\\\\\    
  .......... \\\\\\\\   

  Difficult: \\\\\\\\
  1. Question \\\\\\\\
   a) option \\\\\\\\
  2. Question \\\\\\\\
   b) option \\\\\\\\
  3. Question \\\\\\\\ 
  c) option \\\\\\\\    
  .......... \\\\\\\\   
    
  Before the answers comes out, please insert *****answer***** just once."
  Please provide the answer along with the explanation.  
  Send the correct answers in the following format

  Easy: \\\\\\\\ 
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  Medium: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  Difficult: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\   

  `;
  return prompt;
};

export const KoreanMixedPrompt = (data: Item) => {
  const prompt = `${KoreanSubjectMap[data.subject]} 과목의 ${
    KoreanGradeMap[data.target]
  } 학교 수준에서 ${data.theme} 주제에 대해 ${
    data.problemType.multipleChoice
  }개의 객관식 질문과 ${
    data.problemType.shortAnswer
  }개의 주관식 질문을 생성하세요.
  그리고 ${data.level.easy}개의 쉬운 문제, ${
    data.level.medium
  }개의 중간 난이도 문제, ${data.level.difficult}개의 어려운 문제를 보내세요.
  쉬운, 중간, 어려운 문제들 사이에 객관식과 주관식 질문을 고르게 섞어주세요.

  쉬움: \\\\\\\\  
  1. Question  \\\\\\\\
  2. Question  \\\\\\\\
  3. Question  \\\\\\\\
   .......... \\\\\\\\

  중간: \\\\\\\\
  1. Question \\\\\\\\
  2. Question  \\\\\\\\
  3. Question  \\\\\\\\    
  .......... \\\\\\\\   

  어려움: \\\\\\\\
  1. Question \\\\\\\\
  2. Question \\\\\\\\
  3. Question \\\\\\\\    
  .......... \\\\\\\\

  답이 나오기 전에 *****answer*****를 한 번만 삽입해주세요.
  답과 함께 설명을 제공해주세요.
  정답은 다음 형식으로 보내주세요.

  쉬움: \\\\\\\\ 
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  중간: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  어려움: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  `;

  return prompt;
};

export const EnglishMixedPrompt = (data: Item) => {
  const prompt = `Create ${data.problemType.multipleChoice} multiple-choice questions and ${data.problemType.shortAnswer} short-answer questions.
  on the topic of ${data.theme} in ${data.subject} at the ${data.target} school level, and send ${data.level.easy} easy, send ${data.level.medium} medium,
  and  ${data.level.difficult} difficult questions. mix multiple-choice and short-answer questions evenly across the easy, medium, and difficult levels in korean.

  Easy: \\\\\\\\  
  1. Question  \\\\\\\\
  2. Question  \\\\\\\\
  3. Question  \\\\\\\\
   .......... \\\\\\\\

  Medium: \\\\\\\\
  1. Question \\\\\\\\
  2. Question  \\\\\\\\
  3. Question  \\\\\\\\    
  .......... \\\\\\\\   

  Difficult: \\\\\\\\
  1. Question \\\\\\\\
  2. Question \\\\\\\\
  3. Question \\\\\\\\    
  .......... \\\\\\\\

  Before the answers comes out, please insert *****answer***** just once."
  Please provide the answer along with the explanation.  
  Send the correct answers in the following format:
  Easy: \\\\\\\\ 
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  Medium: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\

  Difficult: \\\\\\\\  
  1. answer - Explanation \\\\\\\\
  2. answer - Explanation \\\\\\\\
  3. answer - Explanation \\\\\\\\
    .......... \\\\\\\\  
  `;
  return prompt;
};
