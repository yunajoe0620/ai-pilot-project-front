// API 호출 펑션
"use server";

import { baseUrl } from "../../api";
import { QuestionItem } from "../../schemas/problem";
import { formatExtraQuestion, formatQuestion } from "../../utils/section-two";

export const createQuestion = async (data: QuestionItem) => {
  const promptData = formatQuestion(data);

  try {
    const url = `${baseUrl}/problem/generate`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ promptData }),
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

export const createExtraQuestion = async (data: string) => {
  const promptData = formatExtraQuestion(data);
  try {
    const url = `${baseUrl}/problem/generate`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ promptData }),
    });
    console.log("response", response);
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
