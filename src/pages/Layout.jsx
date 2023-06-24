import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">products</Link>
          </li>
          <li>
            <Link to="/rqproducts">rqproducts</Link>
          </li>
          <li>
            <Link to="/rqproductsonmount">rqproductsOnMount</Link>
          </li>
          <li>
            <Link to="/parallels">parallels</Link>
          </li>
          <li>
            <Link to="/dynamicparallels">dynamic parallels</Link>
          </li>
          <li>
            <Link to="/dependentqueries">dependent queries</Link>
          </li>
          <li>
            <Link to="/pagination">pagination</Link>
          </li>
          <li>
            <Link to="/infinite">infinite</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
