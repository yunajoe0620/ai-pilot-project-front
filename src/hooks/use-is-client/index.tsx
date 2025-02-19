import { useEffect, useState } from "react";

function useIsClient() {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);
  return {
    isMount,
  };
}

export default useIsClient;
