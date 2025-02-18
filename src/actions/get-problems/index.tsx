// API 호출 펑션
"use server";

import { baseUrl } from "../../api";
import { QuestionItem } from "../../schemas/problem";
import { formatQuestion } from "../../utils/section-two";

export const createQuestion = async (data: QuestionItem) => {
  console.log("data", data);
  const formattedData = formatQuestion(data);
  console.log("formattedDAta", formattedData);
  try {
    const url = `${baseUrl}/problem/generate`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({ target, subject, theme, level, problemType }),
    });
    return response;
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
