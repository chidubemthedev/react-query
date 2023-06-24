import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import Homepage from "./components/Homepage";
import Products from "./components/Products";
import RqProducts from "./components/RqProducts";
import RqProductOnMount from "./components/RqProductOnMount";
import Layout from "./pages/Layout";
import RqProduct from "./components/RqProduct";
import Parrallel from "./components/Parrallel";
import DynamicParallels from "./components/DynamicParallels";
import DependentQueries from "./components/DependentQueries";
import PaginatedQuaries from "./components/PaginatedQuaries";
import InfiniteQuaries from "./components/InfiniteQueries";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/rqproducts" element={<RqProducts />} />
        <Route path="/rqproducts/:productId" element={<RqProduct />} />
        <Route path="/parallels" element={<Parrallel />} />
        <Route path="/dynamicparallels" element={<DynamicParallels productIds={[1,2,3]} />} />
        <Route path="/dependentqueries" element={<DependentQueries email="chukwudubem7@gmail.com"  />} />
        <Route path="/pagination" element={<PaginatedQuaries  />} />
        <Route path="/infinite" element={<InfiniteQuaries  />} />
        <Route path="/rqproductsonmount" element={<RqProductOnMount />} />
      </Route>
    </>
  )
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
