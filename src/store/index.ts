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
    let value = e.target as HTMLElement;
    let newSchool = value.textContent as string;
    if (value) {
      set(() => ({
        school: newSchool,
      }));
    }
  },
}));
