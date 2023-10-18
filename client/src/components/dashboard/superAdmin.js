import { useState, useEffect } from "react";
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
export function SuperAdmin() {
  const [path, setPath] = useState("dashboard");
  const [refetchFlag, setRefetchFlag] = useState(false);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  const getStores = async () => {
    const response = await fetch("http://localhost:4000/api/user/get-stores");
    const json = await response.json();
    setStores(json);
  };
  useEffect(() => {
    getStores();
  }, [refetchFlag]);

  const handleNavigate = () => {
    // navigate("/pos");
    toast.warn("Coming Soon");
  };
  const updatePath = () => {
    setPath("profile");
  };
  //   console.log("mypath", path);

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
      <div>
        {path == "store" ? (
          <StoreList
            stores={stores}
            refetchFlag={refetchFlag}
            setRefetchFlag={setRefetchFlag}
          />
        ) : (
          <></>
        )}
      </div>
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
}
