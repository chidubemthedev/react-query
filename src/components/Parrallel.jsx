import axios from "axios";
import { useQuery } from "react-query";

const fetchProducts = async () => {
  const response = await axios.get("http://localhost:3001/products");
  const data = await response.data;
  return data;
};
const fetchFriends = async () => {
  const response = await axios.get("http://localhost:3001/friends");
  const data = await response.data;
  return data;
};

const Parrallel = () => {
  const { data: products } = useQuery("products", fetchProducts);
  const { data: friends } = useQuery("friends", fetchFriends);

  console.log(products, friends);

  return <div>Parrallel</div>;
};

export default Parrallel;
