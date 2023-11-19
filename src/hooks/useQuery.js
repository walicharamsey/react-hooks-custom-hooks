import { useEffect, useState } from "react";

function useQuery(url) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoaded(false);
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoaded(true); // Assuming setIsLoaded to true on error
      });
  }, [url]);

  return { data, isLoaded };
}

export default useQuery;
