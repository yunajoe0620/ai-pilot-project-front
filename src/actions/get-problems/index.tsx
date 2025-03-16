"use server";

import { baseUrl } from "../../api";
import { AIModelMap } from "../../utils/prompt";

export const createQuestion = async (sentPrompt: string, aiModel: string) => {
  try {
    const url = `${baseUrl}/problem/generate`;
    const model = AIModelMap[aiModel];
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ promptData: sentPrompt, model }),
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        error: error.message,
      };
    }
    return {
      status: "error",
      error: "알수 없는 에러가 발생하였습니다.",
    };
  }
};

export const createDeepSeekQuestion = async (
  sentPrompt: string,
  aiModel: string
) => {
  try {
    const url = `${baseUrl}/problem/generate/deekseek`;
    const model = AIModelMap[aiModel];
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ promptData: sentPrompt, model }),
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        error: error.message,
      };
    }
    return {
      status: "error",
      error: "알수 없는 에러가 발생하였습니다.",
    };
  }
};

// // extra로 문제 던질때 for deelseek
// export const createDeekSeekExtraQuestion = async (data: QuestionItem) => {
//   const promptData = formatExtraQuestion(data);
//   try {
//     const url = `${baseUrl}/problem/generate/deekseek`;
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({ promptData }),
//     });
//     return response.json();
//   } catch (error) {
//     if (error instanceof Error) {
//       return {
//         status: "error",
//         error: error.message,
//       };
//     }
//     return {
//       status: "error",
//       error: "알수 없는 에러가 발생하였습니다.",
//     };
//   }
// };
