import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Image } from "./types";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

export const useFetchData = (path: string) => {
  const [data, setData] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (path) {
      const isSearch = path.includes("search");
      setLoading(true);
      setHasError(false);
      axios
        .get(path)
        .then((response) => {
          if (isSearch) {
            setData(response.data.results);
          } else {
            setData(response.data);
          }
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
    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  return { loader, hasIntersection };
};

export const useLazyLoading =({target, onIntersection}: any)=> {
  useEffect(()=>{
    const observer = new IntersectionObserver(onIntersection, options);
    const current = target.current;
    observer.observe(current);

    return ()=> {
      observer.unobserve(current);
    }
  })
}