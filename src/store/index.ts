import { create } from "zustand";

interface StoreState {
  prompt: string;
  handlePrompt: (newPrompt: string) => void;
}
export const usePromptStore = create<StoreState>((set) => ({
  prompt: "",
  handlePrompt: (newPrompt: string) =>
    set(() => ({
      prompt: newPrompt,
    })),
}));

// step one
interface StepOneState {
  school: string;
  handleSchool: (e: React.MouseEvent<HTMLDivElement>) => void;
  grade: string;
  handleGrade: (e: React.MouseEvent<HTMLDivElement>) => void;
  subject: string;
  handleSubject: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const useStepOneStore = create<StepOneState>((set) => ({
  // 학교
  school: "",
  handleSchool: (e) => {
    let value = e.target as HTMLElement;
    let newSchool = value.textContent as string;
    if (value) {
      set(() => ({
        school: newSchool,
      }));
    }
  },

  // 학년
  grade: "",
  handleGrade: (e) => {
    if (!e || !e.target) {
      set(() => ({
        grade: "",
      }));
      return;
    }

    let value = e.target as HTMLElement;
    let selectedGrade = value.textContent as string;
    if (value) {
      set(() => ({
        grade: selectedGrade,
      }));
    }
  },

  // 과목
  subject: "",
  handleSubject: (e) => {
    if (!e || !e.target) {
      set(() => ({
        subject: "",
      }));
      return;
    }
    let value = e.target as HTMLElement;
    let selectedSubject = value.textContent as string;
    if (value) {
      set(() => ({
        subject: selectedSubject,
      }));
    }
  },
}));

// step2
// step one
interface StepTwoState {
  quizSubject: string;
  handleQuizSubject: (e: React.ChangeEvent<HTMLInputElement>) => void;
  highLevelProblem: string;
  handleHighLevelProblem: (e: React.MouseEvent<HTMLDivElement>) => void;
  mediumLevelProblem: string;
  handleMediumLevelProblem: (e: React.MouseEvent<HTMLDivElement>) => void;
  lowLevelProblem: string;
  handleLowLevelProblem: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const useStepTwoStore = create<StepTwoState>((set) => ({
  // 주제
  quizSubject: "",
  handleQuizSubject: (e) => {
    set(() => ({
      quizSubject: e.target.value,
    }));
  },

  // 상위 문제
  // 주제
  highLevelProblem: "",
  handleHighLevelProblem: (e) => {
    let value = e.target as HTMLElement;
    let selectedHighLevel = value.textContent as string;
    if (value) {
      set(() => ({
        highLevelProblem: selectedHighLevel,
      }));
    }
  },

  // medium
  mediumLevelProblem: "",
  handleMediumLevelProblem: (e) => {
    let value = e.target as HTMLElement;
    let selectedMediumLevel = value.textContent as string;
    if (value) {
      set(() => ({
        mediumLevelProblem: selectedMediumLevel,
      }));
    }
  },

  // low
  lowLevelProblem: "",
  handleLowLevelProblem: (e) => {
    let value = e.target as HTMLElement;
    let selectedLowLevel = value.textContent as string;
    if (value) {
      set(() => ({
        lowLevelProblem: selectedLowLevel,
      }));
    }
  },
}));
