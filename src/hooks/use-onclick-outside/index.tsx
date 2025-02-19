import { RefObject, useEffect } from "react";
import useIsClient from "../use-is-client";

function useOnClickOutside<T extends HTMLElement | HTMLIFrameElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  eventName: string
) {
  console.log("useOnClickOuttside ===>>>>>>>>", ref);

  const { isMount } = useIsClient();

  useEffect(() => {
    if (!isMount) return;
    if (!ref) return;

    if (ref.current) {
      ref.current.addEventListener(eventName, handler);
    }

    return () => {
      ref.current?.removeEventListener(eventName, handler);
    };
  }, [ref, handler, eventName]);
}

export default useOnClickOutside;
