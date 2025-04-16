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
  handleSchool: (e: React.MouseEvent<HTMLDivElement> | string | null) => void;
  grade: string;
  handleGrade: (e: React.MouseEvent<HTMLDivElement> | string | null) => void;
  subject: string;
  handleSubject: (e: React.MouseEvent<HTMLDivElement> | string | null) => void;
}

export const useStepOneStore = create<StepOneState>((set) => ({
  // 학교
  school: "",
  handleSchool: (e) => {
    if (!e) {
      set(() => ({
        school: "",
      }));
      return;
    }
    if (typeof e === "string") {
      set(() => ({
        school: e,
      }));
      return;
    }
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
    if (!e) {
      set(() => ({
        grade: "",
      }));
      return;
    }
    if (typeof e === "string") {
      set(() => ({
        grade: e,
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
    if (!e) {
      set(() => ({
        subject: "",
      }));
      return;
    }
    if (typeof e === "string") {
      set(() => ({
        subject: e,
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
  handleQuizSubject: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
  highLevelProblem: string;
  handleHighLevelProblem: (e: React.MouseEvent<HTMLDivElement>) => void;
  mediumLevelProblem: string;
  handleMediumLevelProblem: (e: React.MouseEvent<HTMLDivElement>) => void;
  lowLevelProblem: string;
  handleLowLevelProblem: (e: React.MouseEvent<HTMLDivElement>) => void;
  totalProblem: number;
  handleTotalProblem: (value: number) => void;

  // 모달분류
  majorSubject: string;
  handleMajorSubject: (
    e: React.MouseEvent<HTMLDivElement> | null | string
  ) => void;
  mediumSubject: string;
  handleMediumSubject: (
    e: React.MouseEvent<HTMLDivElement> | null | string
  ) => void;
  subSubject: string;
  handleSubSubject: (
    e: React.MouseEvent<HTMLDivElement> | null | string
  ) => void;
  isThemeGenerateButton: boolean;
  handleThemeGenerateButton: (value: boolean) => void;
}

export const useStepTwoStore = create<StepTwoState>((set) => ({
  // 주제
  quizSubject: "",
  handleQuizSubject: (e) => {
    if (typeof e === "string") {
      set(() => ({
        quizSubject: e,
      }));
      return;
    }
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

  totalProblem: 0,
  handleTotalProblem: (value: number) => {
    set(() => ({
      totalProblem: value,
    }));
  },

  majorSubject: "",
  handleMajorSubject: (e) => {
    if (!e) {
      set(() => ({
        majorSubject: "",
      }));
      return;
    }
    if (typeof e === "string") {
      set(() => ({
        majorSubject: e,
      }));
      return;
    }
    let value = e.target as HTMLElement;
    let selectedValue = value.textContent as string;
    if (value) {
      set(() => ({
        majorSubject: selectedValue,
      }));
    }
  },

  mediumSubject: "",
  handleMediumSubject: (e) => {
    if (!e) {
      set(() => ({
        mediumSubject: "",
      }));
      return;
    }
    if (typeof e === "string") {
      set(() => ({
        mediumSubject: e,
      }));
      return;
    }
    let value = e.target as HTMLElement;
    let selectedValue = value.textContent as string;
    set(() => ({
      mediumSubject: selectedValue,
    }));
  },

  subSubject: "",
  handleSubSubject: (e) => {
    if (!e) {
      set(() => ({
        subSubject: "",
      }));
      return;
    }
    if (typeof e === "string") {
      set(() => ({
        subSubject: e,
      }));
      return;
    }
    let value = e.target as HTMLElement;
    let selectedValue = value.textContent as string;
    set(() => ({
      subSubject: selectedValue,
    }));
  },

  isThemeGenerateButton: false,
  handleThemeGenerateButton: (value: boolean) => {
    set(() => ({
      isThemeGenerateButton: value,
    }));
  },
}));

// stepThree

// TODO: type수정하기!
interface StepThreeState {
  multipleChoice: string;
  handleMultipleChoice: (e: React.MouseEvent<HTMLDivElement> | any) => void;
  shortAnswer: string;
  handleShortAnswerProblem: (e: React.MouseEvent<HTMLDivElement> | any) => void;
}
export const useStepThreeStore = create<StepThreeState>((set) => ({
  multipleChoice: "",
  handleMultipleChoice: (e) => {
    if (typeof e === "number") {
      set(() => ({
        multipleChoice: e.toString(),
      }));
    } else {
      let value = e.target as HTMLElement;
      let selectedMultipleChoice = value.textContent as string;
      set(() => ({
        multipleChoice: selectedMultipleChoice,
      }));
    }
  },

  shortAnswer: "",
  handleShortAnswerProblem: (e) => {
    if (typeof e === "number") {
      set(() => ({
        shortAnswer: e.toString(),
      }));
    } else {
      let value = e.target as HTMLElement;
      let selectedShortAnswer = value.textContent as string;
      if (value) {
        set(() => ({
          shortAnswer: selectedShortAnswer,
        }));
      }
    }
  },
}));

// stepFour
interface StepFortState {
  extraRequest: string;
  handleExtraRequest: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const useStepFourStore = create<StepFortState>((set) => ({
  extraRequest: "",
  handleExtraRequest: (e) => {
    set(() => ({
      extraRequest: e.target.value,
    }));
  },
}));
