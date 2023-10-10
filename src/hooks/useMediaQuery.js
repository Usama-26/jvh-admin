import { useEffect, useState } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    function handleMatchChange(event) {
      setMatches(event.matches);
    }

    mediaQuery.addEventListener("change", handleMatchChange);
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleMatchChange);
    };
  }, [query]);

  return matches;
}
export default useMediaQuery;
