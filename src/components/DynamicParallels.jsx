import axios from "axios";
import { useQueries } from "react-query";

const fetchProduct = async (productId) => {
  const response = await axios.get(
    `http://localhost:3001/products/${productId}`
  );
  const data = await response.data;
  return data;
};

const DynamicParallels = ({ productIds }) => {
  const queryResults = useQueries(
    productIds.map((id) => {
      return {
        queryKey: ["products", id],
        queryFn: () => fetchProduct(id),
      };
    })
  );

  console.log({queryResults})

  return <div>DynamicParallels</div>;
};

export default DynamicParallels;
