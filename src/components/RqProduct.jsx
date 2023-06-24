import { useParams } from "react-router-dom";
import { useProductItem } from "../hooks/useProductItem";

const RqProduct = () => {
  const { productId } = useParams();
  const { data, error, isLoading } = useProductItem(productId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div>{data.title}</div>
      <div>{data.description}</div>
      <div>{data.price}</div>
    </>
  );
};

export default RqProduct;
