import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";
// import axios from "axios";

const fetchProducts = async () => {
  // const response = await axios.get("http://localhost:3001/products");
  const response = await request({url: "/products"});
  const data = await response.data;
  return data;
};

const postProduct = async (product) => {
  // const response = await axios.post("http://localhost:3001/products", product);
  const response = await request({url: "/products", method: "POST", data: product});
  const data = response.data;
  return data;
};

export const useProductList = (onSuccess, onError, onMountEvent) => {
  return useQuery("products", fetchProducts, {
    cacheTime: 500000,
    staleTime: 500000,
    enabled: onMountEvent,
    onSuccess: onSuccess,
    onError: onError,
    // select: (data) => {
    //   const productTitle = data.map((product) => product.title);
    //   return productTitle;
    // },
    // refreshOnMount: true,
    // refetchOnWindowFocus: true,
    // refetchInterval: 2000,
    // refetchIntervalInBackground: true,
    // refetchOnReconnect: true,
    // retry: 3,
    // retryDelay: 1000,
    // onError: (error) => {
    //   console.log(error);
    // },
  });
};

export const usePostProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(postProduct, {
    // the onSuccess is for handling mutation without sending another fetch request
    // onSuccess: (data) => {
    //   // console.log({ dattt: data });
    //   // queryClient.invalidateQueries("products")
    //   queryClient.setQueryData("products", (oldQueryData) => {
    //     console.log(...oldQueryData, data)
    //     return [...oldQueryData, data];
    //   });
    // },

    //the below 3 are for optimistic updates
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries("products");
      const prevProducts = queryClient.getQueryData("products");
      queryClient.setQueryData("products", (oldQueryData) => {
        console.log(...oldQueryData, newProduct);
        return [
          ...oldQueryData,
          { id: oldQueryData.length + 1, ...newProduct },
        ];
      });
      return {
        prevProducts,
      };
    },
    onError: (error, product, context) => {
      queryClient.setQueryData("products", context.prevProducts)
    },
    onSettled: () => {
      queryClient.invalidateQueries("products")
    },
  });
};
