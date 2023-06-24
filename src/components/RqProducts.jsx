import { Link } from "react-router-dom";
import { usePostProduct, useProductList } from "../hooks/useProductList";
import { useState } from "react";

const RqProducts = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const onSuccess = (data) => {
    console.log("perform sideeffect after fetching data", data);
  };

  const onError = (error) => {
    console.log("perform sideeffect after failed data fetching", error);
  };

  const { data, isLoading, error, refetch } = useProductList(
    onSuccess,
    onError,
    false
  );

  const imageUrl = 'Just a text';

  const { mutate } = usePostProduct()

  const addProductHandler = (e) => {
    e.preventDefault()
    console.log({title, description, price})
    const product = {title, description, price, imageUrl}
    mutate(product)
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div>Products</div>
      <div>
        <form onSubmit={addProductHandler}>
          <label htmlFor="title">Title</label> <br />
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} /> <br />
          <label htmlFor="description">Description</label> <br />
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} /> <br />
          <label htmlFor="price">Price</label> <br />
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} /> <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      
      <button onClick={refetch}>Fetch Products</button>
      <ul>
        {data?.map((product) => (
          <li key={product.id}>
            <Link to={`/rqproducts/${product.id}`}>{product.title}</Link>
          </li>
        ))}
        {/* {data?.map((product) => (
          <li key={product}>{product}</li>
        ))} */}
      </ul>
    </>
  );
};

export default RqProducts;
