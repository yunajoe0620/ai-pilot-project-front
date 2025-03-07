import { create } from "zustand";

interface StoreState {
  isIframeLoad: boolean;
  handleIframeLoad: () => void;
}
export const useIframeStore = create<StoreState>((set) => ({
  isIframeLoad: true,
  handleIframeLoad: () =>
    set((state) => ({ isIframeLoad: !state.isIframeLoad })),
}));
