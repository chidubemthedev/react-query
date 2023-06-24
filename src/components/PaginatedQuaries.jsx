import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchColors = async (pageNumber) => {
  const response = await axios.get(
    `http://localhost:3001/colors?_limit=2&_page=${pageNumber}`
  );
  const data = await response.data;
  return data;
};

const PaginatedQuaries = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const prevPage = () => {
    if (pageNumber <= 1) {
      setPageNumber(1);
    } else {
      setPageNumber((page) => page - 1);
    }
  };
  const nextPage = () => {
    setPageNumber((page) => page + 1);
  };

  const { data, isLoading, error } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div>
        {data.map((color) => (
          <div key={color.id}>
            <h2>{color.id}</h2>
            <p>{color.label}</p>
          </div>
        ))}
      </div>

      <div>
        <button onClick={prevPage} disabled={pageNumber === 1}>
          prev page
        </button>
        <button onClick={nextPage} disabled={pageNumber === 4}>
          next page
        </button>
      </div>
    </>
  );
};

export default PaginatedQuaries;
