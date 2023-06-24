import { useProductList } from "../hooks/useProductList";

const RqProductOnMount = () => {
  const onSuccess = (data) => {
    console.log("perform sideeffect after fetching data (onmount)", data);
  };

  const onError = (error) => {
    console.log("perform sideeffect after failed data fetching (onmount)", error);
  };

  const { data, isLoading, error } = useProductList(
    onSuccess,
    onError,
    true
  );


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div>rqProductOnMountsssssssss</div>
      <ul>
        {data?.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  );
};

export default RqProductOnMount;
