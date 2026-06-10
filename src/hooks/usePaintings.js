import { useEffect, useState } from "react";
import { fetchPaintings } from "../api/galleryApi";

export function usePaintings() {
  const [paintings, setPaintings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchPaintings()
      .then((data) => {
        if (isMounted) {
          setPaintings(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { paintings, isLoading, error };
}
