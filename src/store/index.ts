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
