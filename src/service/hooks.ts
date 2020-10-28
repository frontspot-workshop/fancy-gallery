import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Image } from "./types";

export const useFetchData = (path: string) => {
  const [data, setData] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (path) {
      setLoading(true);
      setHasError(false);
      axios
        .get(path)
        .then((response) => {
          setData(response.data.hits);
          setLoading(false);
        })
        .catch(() => {
          setHasError(true);
          setLoading(false);
        });
    }
  }, [path]);

  return { data, loading, hasError };
};

export const useIntersectionObserver = () => {
  const loader = useRef<HTMLDivElement>(null);
  const [hasIntersection, setHasIntersection] = useState(false);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];

    if (target.intersectionRatio > 0) {
      setHasIntersection(true);
    } else {
      setHasIntersection(false);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      treshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  return { loader, hasIntersection };
};

const getColumnCount = (): number => {
  switch (true) {
    case window.innerWidth < 600:
      return 1;
    case window.innerWidth >= 600 && window.innerWidth < 960:
      return 2;
    case window.innerWidth >= 960 && window.innerWidth < 1280:
      return 3;
    default:
      return 4;
  }
};

export const useAdaptiveGrid = () => {
  const [gridColsCount, setGridColsCount] = useState(getColumnCount());

  useEffect(() => {
    function handleResize() {
      setGridColsCount(getColumnCount());
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return { gridColsCount };
};
