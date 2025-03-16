import { baseUrl } from "../../api";

export const createPdf = async (problem: string, answer: string) => {
  try {
    const url = `${baseUrl}/pdf/generate`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ problem, answer }),
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
};
