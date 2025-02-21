import { RefObject, useEffect } from "react";
import useIsClient from "../use-is-client";

function useOnClickOutside<T extends HTMLElement | HTMLIFrameElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  eventName: string
) {
  const { isMount } = useIsClient();

  useEffect(() => {
    if (!isMount) return;
    if (!ref) return;

    document.addEventListener(eventName, handler);

    // TODO: 애를 넣으면은 handler가 실행이 되지를 않는다. 그러면은 언제 remove를 해야하쥬?
    // return () => {
    //   document.removeEventListener(eventName, handler);
    // };
  }, [ref, handler, eventName]);
}

export default useOnClickOutside;
