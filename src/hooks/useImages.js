import { useState, useEffect, useCallback } from "react";
import { useService } from "../AppContext";

export function useImages() {
  const service = useService();

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // if (query) {
        //   const response = await service.searchImages(query, page);
        //   setImages(response.data);
        // } else {
        //   const response = await service.fetchImages(page);
        // }
        const response = await (query
          ? service.searchImages(query, page)
          : service.fetchImages(page));
        setImages(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    })();
  }, [service, page, query]);

  const changePage = useCallback((page) => {
    if (page > 0) {
      setPage(page);
    }
  }, []);

  return {
    page,
    images,
    setPage: changePage,
    setQuery,
    isLoading,
    triggerLoad: () => setIsLoading(true),
  };
}
