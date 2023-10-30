import { useState, useEffect } from "react";
import React from "react";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import FeatherIcon from "feather-icons-react";
import Dashboard from "../dashboard";
import ProductList from "../../product/ProductList";
import CategoryList from "../../product/CategoryList";
import PrintBarcode from "../../product/PrintBarcode";
import ImportProduct from "../../product/ImportProduct";
import StoreList from "../../store/StoreList";
import SalesList from "../../sales/saleslist";
import UserList from "../../people/UserList";
import SalesR from "../../report/sales";
import EmployeeProfile from "../../profile/employeeProfile";
import { useAuth } from "../../../context/auth";
import { toast } from "react-toastify";
import Taxrates from "../../tax/taxrates";
import Invertry from "../../report/inventry";
// import { useAuth } from "../../../context/auth";
export function SalesPerson() {
  const [path, setPath] = useState("dashboard");
  const { user, logoutUser } = useAuth();
  const [refetchFlag, setRefetchFlag] = useState(false);
  const [products, setProducts] = useState([]);
  const [refetchFlagForProducts, setRefetchFlagForProducts] = useState(false);
  const getProducts = async () => {
    const response = await fetch(
      "http://localhost:4000/api/products/salespersonproducts/" + user?.adminId,
      {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${user.token}`,
        // },
      }
    );
    const json = await response.json();
    setProducts(json);
  };
  useEffect(() => {
    getProducts();
  }, [refetchFlagForProducts]);
  const navigate = useNavigate();

  const handleNavigate = () => {
    // navigate("/pos");
    toast.warn("Coming Soon");
  };
  const updatePath = () => {
    setPath("profile");
  };
  console.log("mypath", path);

  return (
    <div className="main-wrapper">
      <Header updatePath={updatePath} />

      <div className="sidebar " id="sidebar">
        <Scrollbars>
          <div className="slimScrollDiv">
            <div className="sidebar-inner slimscroll">
              <div id="sidebar-menu" className="sidebar-menu">
                <ul>
                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Main</h6>
                    <ul>
                      {/* dashboard */}
                      <li
                        className={path == "dashboard" ? "active" : ""}
                        onClick={() => setPath("dashboard")}
                      >
                        <a>
                          <FeatherIcon icon="grid" />
                          <span>Dashboard</span>
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* products */}
                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Products & Sales</h6>
                    <ul>
                      {/* product list */}
                      <li
                        className={path == "productlist" ? "active" : ""}
                        onClick={() => setPath("productlist")}
                      >
                        <a>
                          <FeatherIcon icon="box" />
                          <span>Products</span>
                        </a>
                      </li>

                      {/* Sale point */}
                      <li
                        className={path == "pos" ? "active" : ""}
                        onClick={handleNavigate}
                      >
                        <a>
                          <FeatherIcon icon="shopping-cart" />
                          <span>Pos</span>
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* sales */}

                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Reports</h6>
                    <ul>
                      <li
                        className={path == "salesreport" ? "active" : ""}
                        onClick={() => setPath("salesreport")}
                      >
                        <a>
                          <FeatherIcon icon="shopping-cart" />
                          <span>Report</span>
                        </a>
                      </li>

                      {/* user */}
                    </ul>
                  </li>

                  {/* people */}
                  <li className="submenu-open d-none">
                    <h6 className="submenu-hdr">Peoples</h6>
                    <ul>
                      {/* user */}
                      <li
                        className={path == "userlist" ? "active" : ""}
                        onClick={() => setPath("userlist")}
                      >
                        <a>
                          <FeatherIcon icon="user-check" />

                          <span>Salesman</span>
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* user management */}

                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Settings</h6>
                    <ul>
                      {/* logout */}
                      <li onClick={logoutUser} className="pointer">
                        <FeatherIcon icon="log-out" />
                        <span>Logout</span>{" "}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>

      <div>{path == "dashboard" ? <Dashboard /> : <></>}</div>
      <div>
        {path == "productlist" ? (
          <ProductList
            categories={[]}
            products={products}
            refetchFlagForProducts={refetchFlagForProducts}
            setRefetchFlagForProducts={setRefetchFlagForProducts}
          />
        ) : (
          <></>
        )}
      </div>
      {/* <div>
        {path == "categorylist" ? (
          <CategoryList
            categories={categories}
            refetchFlag={refetchFlag}
            setRefetchFlag={setRefetchFlag}
          />
        ) : (
          <></>
        )}
      </div> */}
      <div>{path == "printbarcode" ? <PrintBarcode /> : <></>}</div>
      <div>{path == "importproduct" ? <ImportProduct /> : <></>}</div>
      <div>{path === "sales person" && <h2>Sales perosn</h2>}</div>

      {/* sales */}
      <div>{path == "store" ? <StoreList /> : <></>}</div>
      <div>{path == "saleslist" ? <SalesList /> : <></>}</div>

      <div>{path == "userlist" ? <UserList /> : <></>}</div>
      <div>{path == "salesreport" ? <SalesR /> : <></>}</div>
      {/*  <div>{path == "settings" ? <EmailSettings /> : <></>}</div>*/}
      <div>{path == "taxreport" ? <Taxrates /> : <></>}</div>
      <div>{path == "profile" ? <EmployeeProfile /> : <></>}</div>
      <div>{path == "inventoryReport" ? <Invertry /> : <></>}</div>
    </div>
  );
}
