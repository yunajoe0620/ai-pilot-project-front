// SectionAnalyz.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
import { Radar } from "react-chartjs-2";

type Question = {
  id: string;
  text: string;
};

type QuestionGroup = {
  title: string;
  questions: Question[];
};

const questionGroups: QuestionGroup[] = [
  {
    title: "성향 & 관심사",
    questions: [
      { id: "1", text: "나는 새로운 것을 배우는 것을 좋아한다." },
      { id: "2", text: "문제 해결을 위해 논리적으로 사고하는 것이 즐겁다." },
      { id: "3", text: "사람들과 소통하고 협력하는 것이 중요하다고 생각한다." },
      { id: "4", text: "창의적인 아이디어를 내는 것을 좋아한다." },
      { id: "5", text: "숫자와 데이터 분석이 재미있다." },
      { id: "6", text: "글을 쓰거나 표현하는 것이 즐겁다." },
      {
        id: "7",
        text: "예술, 디자인, 또는 미적 감각이 중요한 분야에 관심이 있다.",
      },
      { id: "8", text: "과학 실험이나 연구하는 것을 좋아한다." },
      { id: "9", text: "사회 문제나 정치, 경제 등에 관심이 많다." },
      {
        id: "10",
        text: "컴퓨터 프로그램을 만들거나 IT 기술을 배우는 것이 흥미롭다.",
      },
    ],
  },
  {
    title: "학습 스타일 & 강점",
    questions: [
      { id: "11", text: "계획을 세우고 체계적으로 실행하는 것을 잘한다." },
      {
        id: "12",
        text: "세부적인 것보다 전체적인 그림을 보는 것이 더 편하다.",
      },
      {
        id: "13",
        text: "수학적 사고(공식, 논리적 풀이)를 하는 것이 익숙하다.",
      },
      { id: "14", text: "사람들의 감정이나 심리를 이해하는 것이 어렵지 않다." },
      {
        id: "15",
        text: "실험, 실습, 현장 경험을 통해 배우는 것이 효과적이다.",
      },
      { id: "16", text: "토론하고 의견을 나누는 과정에서 배우는 것이 좋다." },
      { id: "17", text: "감각적이고 직관적으로 사고하는 편이다." },
      { id: "18", text: "반복적이고 세부적인 작업을 하는 것이 어렵지 않다." },
      { id: "19", text: "스스로 목표를 세우고 실행하는 것이 잘 된다." },
      {
        id: "20",
        text: "집중해서 오랫동안 한 가지 작업을 하는 것이 가능하다.",
      },
    ],
  },
];

const openEndedQuestions = [
  {
    id: "21",
    text: "어떤 주제나 활동에 가장 흥미를 느끼나요? (예: 과학 실험, 글쓰기, 예술, 사회 문제 분석, 기술 개발 등)",
  },
  {
    id: "22",
    text: "자신이 잘하는 것과 못하는 것은 무엇인가요? (예: 논리적 사고, 창의성, 조직력, 예민한 감각, 협업 등)",
  },
  {
    id: "23",
    text: "혼자 일하는 것 vs 팀 활동, 이론 탐구 vs 실천적 문제 해결 중 어떤 것을 선호하나요?",
  },
  {
    id: "24",
    text: "스트레스를 받을 때 어떻게 대처하나요? (예: 체계적인 계획 수립, 창의적인 아이디어 탐색)",
  },
  {
    id: "25",
    text: "대학 진학 후 가장 중요하게 생각하는 것은 무엇인가요? (예: 전문성 쌓기, 창업, 사회적 영향력, 안정적인 직업)",
  },
  {
    id: "26",
    text: "이론을 깊이 공부하는 것 vs 실제 프로젝트를 하는 것 중 어떤 것이 더 끌리나요?",
  },
  { id: "27", text: "특정 학과에 대한 선호도나 제외하고 싶은 분야가 있나요?" },
];

const options = [
  { value: "매우 그렇다", label: "매우 그렇다" },
  { value: "그렇다", label: "그렇다" },
  { value: "보통이다", label: "보통이다" },
  { value: "아니다", label: "아니다" },
  { value: "전혀 아니다", label: "전혀 아니다" },
];

type Responses = {
  [questionId: string]: string;
};

type GPTResponse = {
  analysis: string;
  recommendedMajors: {
    major: string;
    reason: string;
  }[];
  recommendedJobs: {
    jobTitle: string;
    description: string;
    requiredSkills: string;
  }[];
  preparationPlan: string;
};

interface SuggestionResponse {
  userDesiredMajorFeedback: string;
}
export default function SectionAnalyz() {
  const [responses, setResponses] = useState<Responses>({});
  const [result, setResult] = useState<GPTResponse | null>(null);
  const [showAdditionalQuestions, setShowAdditionalQuestions] =
    useState<boolean>(false);
  const [additionalResponses, setAdditionalResponses] = useState<{
    [key: string]: string;
  }>({});
  const [additionalRecommendation, setAdditionalRecommendation] =
    useState<any>(null);
  const [additionalLoading, setAdditionalLoading] = useState<boolean>(false);
  const [majorSuggestion, setMajorSuggestion] = useState("");
  const [showMajorSuggestionInput, setShowMajorSuggestionInput] =
    useState(false);
  const [suggestionResponse, setSuggestionResponse] =
    useState<SuggestionResponse | null>(null);

  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [showAlternativeOption, setShowAlternativeOption] =
    useState<boolean>(false);
  const [skillScores, setSkillScores] = useState<number[]>([]);
  const scaleMap: Record<string, number> = {
    "매우 그렇다": 5,
    그렇다: 4,
    보통이다: 3,
    아니다: 2,
    "전혀 아니다": 1,
  };
  const radarLabels = [
    "데이터 분석",
    "기획 능력",
    "팀워크",
    "글로벌 시장",
    "창업/스타트업",
    "비즈니스 전략",
    "IT기술",
    "AI/머신러닝",
  ];

  const questionIdToRadarIndex: Record<string, number> = {
    "5": 0, // "숫자와 데이터 분석이 재미있다." → 데이터 분석
    "2": 1, // "문제 해결을 위해 논리적으로 사고하는 것이 즐겁다." → 기획 능력
    "3": 2, // "사람들과 소통하고 협력하는 것이 중요하다." → 팀워크
    "9": 3, // "사회 문제나 정치, 경제 등에 관심이 많다." → 글로벌 시장
    "4": 4, // "창의적인 아이디어를 내는 것을 좋아한다." → 창업/스타트업
    "11": 5, // "계획을 세우고 체계적으로 실행하는 것을 잘한다." → 비즈니스 전략
    "10": 6, // "컴퓨터 프로그램을 만들거나 IT 기술을 배우는 것이 흥미롭다." → IT기술
    "13": 7, // "수학적 사고(공식, 논리적 풀이)를 하는 것이 익숙하다." → AI/머신러닝
  };

  const additionalQuestions = [
    {
      id: "add1",
      text: "추가 질문 1: 전공 선택 시 가장 중요하게 생각하는 요소는 무엇인가요? (예: 흥미, 미래 전망, 사회적 영향력 등)",
    },
    {
      id: "add2",
      text: "추가 질문 2: 선호하는 학습 방식과 학습 환경에 대해 자세히 말씀해 주세요.",
    },
    {
      id: "add3",
      text: "추가 질문 3: 특정 분야나 주제에 대해 더 깊이 탐구하고 싶은 이유는 무엇인가요?",
    },
  ];

  function calculateSkillScores(resps: Responses) {
    const scores = Array(radarLabels.length).fill(0);
    const counts = Array(radarLabels.length).fill(0);

    Object.entries(resps).forEach(([qId, answer]) => {
      const numericValue = scaleMap[answer] || 0;
      const radarIndex = questionIdToRadarIndex[qId];
      if (radarIndex !== undefined) {
        scores[radarIndex] += numericValue;
        counts[radarIndex]++;
      }
    });

    for (let i = 0; i < scores.length; i++) {
      if (counts[i] > 0) {
        scores[i] = scores[i] / counts[i];
      }
    }

    return scores;
  }

  const handleSubmitMajorSuggestion = async () => {
    try {
      setSuggestionLoading(true);
      const res = await fetch("http://localhost:5000/major-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suggestion: majorSuggestion }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${errorText}`);
      }
      const data = await res.json();
      setSuggestionResponse(data);
    } catch (error) {
      console.error("Error fetching suggestion response:", error);
    } finally {
      setSuggestionLoading(false);
      setShowMajorSuggestionInput(false);
    }
  };

  const handleSubmitAdditionalQuestions = async () => {
    try {
      setAdditionalLoading(true);
      const payload = {
        additionalResponses,
        originalResponses: responses,
      };

      const res = await fetch("http://localhost:5000/additional-majors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await res.json();
      setAdditionalRecommendation(data);
    } catch (error) {
      console.error("Error fetching additional recommendation:", error);
    } finally {
      setAdditionalLoading(false);
      setShowAdditionalQuestions(false);
    }
  };

  const handleChange = (questionId: string, value: string) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newSkillScores = calculateSkillScores(responses);
      setSkillScores(newSkillScores);
      const res = await fetch("http://localhost:5000/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responses),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${errorText}`);
      }
      const data = await res.json();
      setResult(data.recommendation);
      setShowAlternativeOption(true);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    } finally {
      setLoading(false);
    }
  };
  const radarData = {
    labels: radarLabels,
    datasets: [
      {
        label: "나의 점수",
        data: skillScores.map((s) => s * 20),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        pointLabels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        진로 및 관심사 테스트
      </Typography>
      <Typography variant="body1" gutterBottom>
        각 문항에 대해 응답해주세요!
      </Typography>

      <form onSubmit={handleSubmit}>
        {questionGroups.map((group) => (
          <Accordion key={group.title} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{group.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {group.questions.map((question) => (
                <Box key={question.id} mb={2}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{question.text}</FormLabel>
                    <RadioGroup
                      row
                      onChange={(e) =>
                        handleChange(question.id, e.target.value)
                      }
                    >
                      {options.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio required />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

        <Box mt={4}>
          <Typography variant="h6">학과 적성 진단 질문</Typography>
          {openEndedQuestions.map((question) => (
            <Box key={question.id} mb={2}>
              <Typography>{question.text}</Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                required
                onChange={(e) => handleChange(question.id, e.target.value)}
              />
            </Box>
          ))}
        </Box>

        <Box mt={3} textAlign="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "결과 보기"}
          </Button>
        </Box>
      </form>

      {skillScores.length > 0 && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>
            나의 역량 레이더 차트
          </Typography>
          <Box sx={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
            <Radar data={radarData} options={radarOptions} />
          </Box>
        </Box>
      )}
      {result && (
        <Box mt={5}>
          <Typography variant="h5" gutterBottom>
            추천 결과
          </Typography>
          <Box mb={3} p={2} border="1px solid #ddd" borderRadius="4px">
            <Typography variant="h6" gutterBottom>
              학과 적성 진단 결과 분석
            </Typography>
            <Typography variant="body1" whiteSpace="pre-line">
              {result.analysis}
            </Typography>
          </Box>
          <Box mb={3} p={2} border="1px solid #ddd" borderRadius="4px">
            <Typography variant="h6" gutterBottom>
              추천 학과 (TOP 3)
            </Typography>
            {result.recommendedMajors.map((majorItem, idx) => (
              <Box key={idx} mb={2}>
                <Typography variant="subtitle1">
                  {idx + 1}. {majorItem.major}
                </Typography>
                <Typography variant="body2">{majorItem.reason}</Typography>
              </Box>
            ))}
          </Box>
          <Box mb={3} p={2} border="1px solid #ddd" borderRadius="4px">
            <Typography variant="h6" gutterBottom>
              추천 유망 직업
            </Typography>
            {result.recommendedJobs.map((jobItem, idx) => (
              <Box key={idx} mb={2}>
                <Typography variant="subtitle1">
                  {idx + 1}. {jobItem.jobTitle}
                </Typography>
                <Typography variant="body2">{jobItem.description}</Typography>
                <Typography variant="body2">
                  필요한 역량: {jobItem.requiredSkills}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box mb={3} p={2} border="1px solid #ddd" borderRadius="4px">
            <Typography variant="h6" gutterBottom>
              준비 전략
            </Typography>
            <Typography variant="body1" whiteSpace="pre-line">
              {result.preparationPlan}
            </Typography>
          </Box>
          <Box mb={3} p={2} border="1px solid #ddd" borderRadius="4px">
            <Typography variant="h6" gutterBottom>
              원하는 학과에 추가 제안이 있으신가요?
            </Typography>
            {!showMajorSuggestionInput ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowMajorSuggestionInput(true)}
              >
                추가 제안하기
              </Button>
            ) : (
              <>
                <TextField
                  label="추가 제안"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={majorSuggestion}
                  onChange={(e) => setMajorSuggestion(e.target.value)}
                  sx={{ mt: 2, mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitMajorSuggestion}
                  disabled={suggestionLoading}
                >
                  {suggestionLoading ? "제출 중..." : "제출"}
                </Button>
              </>
            )}
          </Box>
          {suggestionResponse && (
            <Box mb={3} p={2} border="1px solid #ddd" borderRadius="4px">
              <Typography variant="h6" gutterBottom>
                추가 제안 결과
              </Typography>
              <Typography variant="body1" whiteSpace="pre-line">
                {suggestionResponse.userDesiredMajorFeedback}
              </Typography>
            </Box>
          )}

          {showAlternativeOption && !showAdditionalQuestions && (
            <Box mt={5}>
              <Typography variant="h6" gutterBottom>
                다른 학과 추천 받으시겠습니까?
              </Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowAdditionalQuestions(true)}
                  disabled={loading}
                >
                  예
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowAlternativeOption(false)}
                >
                  아니오
                </Button>
              </Box>
            </Box>
          )}
          {showAdditionalQuestions && (
            <Box mt={5} p={2} border="1px solid #ddd" borderRadius="4px">
              <Typography variant="h6" gutterBottom>
                추가 질문
              </Typography>
              {additionalQuestions.map((question) => (
                <Box key={question.id} mb={2}>
                  <Typography>{question.text}</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    value={additionalResponses[question.id] || ""}
                    onChange={(e) =>
                      setAdditionalResponses((prev) => ({
                        ...prev,
                        [question.id]: e.target.value,
                      }))
                    }
                  />
                </Box>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitAdditionalQuestions}
                disabled={additionalLoading}
              >
                {additionalLoading ? "제출 중..." : "제출"}
              </Button>
            </Box>
          )}
          {additionalRecommendation && (
            <Box mt={5}>
              <Typography variant="h5" gutterBottom>
                추가 추천 학과
              </Typography>
              {additionalRecommendation.recommendedAdditionalMajors.map(
                (item: any, idx: number) => (
                  <Box
                    key={idx}
                    mb={2}
                    p={2}
                    border="1px solid #ddd"
                    borderRadius="4px"
                  >
                    <Typography variant="subtitle1">
                      {idx + 1}. {item.major}
                    </Typography>
                    <Typography variant="body2">{item.reason}</Typography>
                  </Box>
                )
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
