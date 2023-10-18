import { useState } from "react";
import React from "react";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import FeatherIcon from "feather-icons-react";
import Dashboard from "./dashboard";
import ProductList from "../product/ProductList";
import CategoryList from "../product/CategoryList";
import PrintBarcode from "../product/PrintBarcode";
import ImportProduct from "../product/ImportProduct";
import StoreList from "../store/StoreList";
import SalesList from "../sales/saleslist";
import UserList from "../people/UserList";
import SalesR from "../report/sales";
import EmployeeProfile from "../profile/employeeProfile";
import { toast } from "react-toastify";
const DefaultLayout = () => {
  const [path, setPath] = useState("dashboard");
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
                    <h6 className="submenu-hdr">Products</h6>
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

                      {/* product category list */}

                      <li
                        className={path == "categorylist" ? "active" : ""}
                        onClick={() => setPath("categorylist")}
                      >
                        <a>
                          <FeatherIcon icon="codepen" />
                          <span>Category</span>
                        </a>
                      </li>

                      {/* barcode */}
                      <div className="">
                        <li
                          className={path == "printbarcode" ? "active" : ""}
                          onClick={() => setPath("printbarcode")}
                        >
                          <a>
                            <FeatherIcon icon="align-justify" />
                            <span>Print Barcode</span>
                          </a>
                        </li>

                        {/* import products */}

                        <li
                          className={path == "importproduct" ? "active" : ""}
                          onClick={() => setPath("importproduct")}
                        >
                          <a>
                            <FeatherIcon icon="minimize-2" />
                            <span>Import Products</span>
                          </a>
                        </li>
                      </div>
                    </ul>
                  </li>

                  {/* sales */}

                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Sales</h6>
                    <ul>
                      <li
                        className={path == "saleslist" ? "active" : ""}
                        onClick={() => setPath("saleslist")}
                      >
                        <a>
                          <FeatherIcon icon="shopping-cart" />
                          <span>Sales & invoice</span>
                        </a>
                      </li>
                      {/* invoice */}
                      {/* <li
                        className={path == "invoicereport" ? "active" : ""}
                        onClick={() => setPath("invoicereport")}
                      >
                        <a>
                          <FeatherIcon icon="shopping-cart" />
                          <span>Invoice</span>
                        </a>
                      </li> */}
                      {/* pos */}
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

                  {/* people */}
                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Peoples</h6>
                    <ul>
                      {/* store */}
                      <li
                        className={path == "store" ? "active" : ""}
                        onClick={() => setPath("store")}
                      >
                        <a>
                          <FeatherIcon icon="home" />
                          <span>Store</span>
                        </a>
                      </li>
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

                  {/* reports */}
                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Reports</h6>
                    <ul>
                      <li
                        className={path == "salesreport" ? "active" : ""}
                        onClick={() => setPath("salesreport")}
                      >
                        <a>
                          <FeatherIcon icon="bar-chart-2" />
                          <span>Sales Report</span>
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* user management */}

                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Settings</h6>
                    <ul>
                      <li
                        className={path == "settings" ? "active" : ""}
                        onClick={() => setPath("settings")}
                      >
                        <a>
                          <FeatherIcon icon="settings" />
                          <span>Email Settings</span>
                        </a>
                      </li>

                      <li
                        className={path == "taxreport" ? "active" : ""}
                        onClick={() => setPath("taxreport")}
                      >
                        <a>
                          <FeatherIcon icon="bar-chart" />
                          <span>Tax Rates </span>
                        </a>
                      </li>

                      {/* logout */}
                      <li>
                        <a>
                          <FeatherIcon icon="log-out" />
                          <span>Logout</span>{" "}
                        </a>
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
      <div>{path == "productlist" ? <ProductList /> : <></>}</div>
      <div>{path == "categorylist" ? <CategoryList /> : <></>}</div>
      <div>{path == "printbarcode" ? <PrintBarcode /> : <></>}</div>
      <div>{path == "importproduct" ? <ImportProduct /> : <></>}</div>

      {/* sales */}
      <div>{path == "store" ? <StoreList /> : <></>}</div>
      <div>{path == "saleslist" ? <SalesList /> : <></>}</div>
      {/*  <div>{path == "invoicereport" ? <Sales /> : <></>}</div>
        <div>{path == "supplierlist" ? <Supplier /> : <></>}</div> */}
      <div>{path == "userlist" ? <UserList /> : <></>}</div>
      <div>{path == "salesreport" ? <SalesR /> : <></>}</div>
      {/*  <div>{path == "settings" ? <EmailSettings /> : <></>}</div>
        <div>{path == "taxreport" ? <Taxrates /> : <></>}</div> */}
      <div>{path == "profile" ? <EmployeeProfile /> : <></>}</div>
    </div>
  );
};

export default DefaultLayout;
