import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import * as BooksAPI from "../BooksAPI";

function useQuery(query) {
  const [searchBooks, setSearchBooks] = useState([]);
  const [value] = useDebounce(query, 400);

  useEffect(() => {
    let isActive = true;

    if (value) {
      BooksAPI.search(value).then((data) => {
        if (data.error) {
          setSearchBooks([]);
        } else {
          if (isActive) {
            setSearchBooks(data);
          }
        }
      });
    }

    return () => {
      isActive = false;
      setSearchBooks([]);
    };
  }, [value]);

  return [searchBooks, setSearchBooks];
}

export default useQuery;
