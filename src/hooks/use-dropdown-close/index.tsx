import { useEffect } from "react";

interface userDropDownCloseProps {
  isDropdownOne: boolean;
  setIsDropdownOne: React.Dispatch<React.SetStateAction<boolean>>;
  isDropdownTwo: boolean;
  setIsDropdownTwo: React.Dispatch<React.SetStateAction<boolean>>;
  isDropdownThree: boolean;
  setIsDropdownThree: React.Dispatch<React.SetStateAction<boolean>>;
}

function useDropDownClose({
  isDropdownOne,
  setIsDropdownOne,
  isDropdownTwo,
  setIsDropdownTwo,
  isDropdownThree,
  setIsDropdownThree,
}: userDropDownCloseProps) {
  useEffect(() => {
    if (isDropdownOne) {
      setIsDropdownTwo(false);
      setIsDropdownThree(false);
      return;
    }
    if (isDropdownTwo) {
      setIsDropdownOne(false);
      setIsDropdownThree(false);
      return;
    }
    if (isDropdownThree) {
      setIsDropdownOne(false);
      setIsDropdownTwo(false);
      return;
    }
  }, [isDropdownOne, isDropdownTwo, isDropdownThree]);

  return <></>;
}

export default useDropDownClose;
