import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchProduct = async ({ queryKey }) => {
  const productId = queryKey[1];
  const response = await axios.get(
    `http://localhost:3001/products/${productId}`
  );
  const data = await response.data;
  return data;
};

export const useProductItem = (productId) => {
  const queryClient = useQueryClient()
  return useQuery(["productItem", productId], fetchProduct, {
    initialData: () => {
      const product = queryClient.getQueryData("products")?.find((product) => product.id === productId)
      console.log(product)

      if (product) {
        return {
         product: product
        }
      } else {
        return undefined
      }
    }
  });
};
