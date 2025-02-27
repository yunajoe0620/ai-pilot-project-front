import { baseUrl } from "../../api";

export const createPdf = async (data: string) => {
  try {
    const url = `${baseUrl}/pdf/generate`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ data }),
    });
    const result = await response.text();
    console.log("result ========>>>>>>>>>", result);
    return result;
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
