"use server";

import { baseUrl } from "../../api";
import { QuestionItem } from "../../schemas/problem";
import {
  formatExtraQuestion,
  formatQuestion,
  mixedFormatQuestion,
} from "../../utils/section-two";
export const createQuestion = async (data: QuestionItem) => {
  const problemType = data.problemType;
  let promptData;

  // 2개의 타입을 선택하였을 때
  if (problemType.multipleChoice !== "0" && problemType.shortAnswer !== "0") {
    console.log("객관식과 주관식 혼합형 문제를 냅니다");
    promptData = mixedFormatQuestion(data);
  } else {
    // 1개의 type을 선택하였을 때
    console.log("객관식 또오는 주관식 문제만 나온다아아아");
    promptData = formatQuestion(data);
  }

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

export const createExtraQuestion = async (data: QuestionItem) => {
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

export const createDeepSeekQuestion = async (data: QuestionItem) => {
  const promptData = formatQuestion(data);
  try {
    const url = `${baseUrl}/problem/generate/deekseek`;
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

export const createDeekSeekExtraQuestion = async (data: QuestionItem) => {
  const promptData = formatExtraQuestion(data);
  try {
    const url = `${baseUrl}/problem/generate/deekseek`;
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
