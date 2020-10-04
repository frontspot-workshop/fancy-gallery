import { useState, useEffect, useCallback } from "react";
import { useService } from "../AppContext";

export function useImages() {
  const service = useService();

  const [images, setImages] = useState([]);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      if (query) {
        const response = await service.searchImages(query, page);
        setImages(response.data);
      } else {
        const response = await service.fetchImages(page);
        setImages(response.data);
      }
    })();
  }, [service, page, query]);

  const changePage = useCallback((page) => {
    console.log("Function render: ", page);
    if (page > 0) {
      setPage(page);
    }
  }, []);

  return {
    page,
    images,
    setPage: changePage,
    setQuery,
  };
}
