import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchColors = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `http://localhost:3001/colors?_limit=2&_page=${pageParam}`
  );
  const data = await response.data;
  return data;
};

const InfiniteQuaries = () => {
  const { data, isLoading, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery(["colors"], fetchColors, {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });

//   console.log(data);
//   const pages = data?.pages;
//   console.log(pages);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div>
        {data?.pages?.map((group, index) => {
          return (
            <div key={index}>
              {group.map((color) => (
                <div key={color.id}>
                  <h2>{color.id}</h2>
                  <p>{color.label}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
    </>
  );
};

export default InfiniteQuaries;
