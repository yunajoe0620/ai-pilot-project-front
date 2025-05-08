import { RefObject, useEffect } from "react";

interface UseClickOutSideProps<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T> | RefObject<null>;
  callback: () => void;
}

function useClickOutside({ ref, callback }: UseClickOutSideProps) {
  useEffect(() => {
    const handleClickOutSide = (event: any) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClickOutSide);
    document.addEventListener("touchstart", handleClickOutSide);

    return () => {
      document.removeEventListener("mouseup", handleClickOutSide);
      document.removeEventListener("touchstart", handleClickOutSide);
    };
  }, [ref.current]);

  return <></>;
}

export default useClickOutside;
