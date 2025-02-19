import { RefObject, useEffect } from "react";

function useOnClickOutside<T extends HTMLElement | HTMLIFrameElement>(
  ref: RefObject<T> | null,
  handler: () => void,
  eventName: string
) {
  console.log("Ref", ref, handler);

  useEffect(() => {
    if (!ref) return;

    if (ref.current) {
      ref.current.addEventListener(eventName, handler);
    }

    return () => {
      ref.current.removeEventListener(eventName, handler);
    };
  }, [ref]);
}

export default useOnClickOutside;
