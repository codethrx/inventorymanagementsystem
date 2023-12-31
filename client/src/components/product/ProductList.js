/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import {
  PlusIcon,
  MacbookIcon,
  IphoneIcon,
  SamsungIcon,
  EarpodIcon,
  OrangeImage,
  PineappleImage,
  StawberryImage,
  AvocatImage,
  EyeIcon,
  EditIcon,
  DeleteIcon,
  search_whites,
} from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { Modal } from "react-bootstrap";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ProductDetails from "./productDetails";
import { useAuth } from "../../context/auth";
import { useLocation } from "react-router-dom";
const ProductList = ({
  categories,
  products,
  refetchFlagForProducts,
  setRefetchFlagForProducts,
}) => {
  const [inputfilter, setInputfilter] = useState(false);
  const [product, setProduct] = useState({});
  const { user } = useAuth();
  const location = useLocation();
  console.log(location);
  //select2
  const options = [
    { id: 1, text: "Choose Product", text: "Choose Product" },
    { id: 2, text: "Macbook pro", text: "Macbook pro" },
    { id: 3, text: "Orange", text: "Orange" },
  ];
  const options2 = [
    { id: 1, text: "Choose Category", text: "Choose Category" },
    { id: 2, text: "Computers", text: "Computers" },
    { id: 3, text: "Fruits", text: "Fruits" },
  ];

  const options5 = [
    { id: 1, text: "Price", text: "Price" },
    { id: 2, text: "150.00", text: "150.00" },
  ];

  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const confirmText = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "swal2-confirm  btn btn-primary btn-added",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonClass: "btn btn-success btn-added",
        });
    });
  };

  const [data] = useState([
    {
      id: 1,
      image: MacbookIcon,
      productName: "Macbook pro",
      sku: "PT001",
      category: "Computer",
      brand: "N/D",
      price: "1500.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
    {
      id: 2,
      image: OrangeImage,
      productName: "Orange",
      sku: "PT002",
      category: "Fruits",
      brand: "N/D",
      price: "20.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
    {
      id: 3,
      image: PineappleImage,
      productName: "Pinapple",
      sku: "PT003",
      category: "Fruits",
      brand: "N/D",
      price: "10.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
    {
      id: 4,
      image: StawberryImage,
      productName: "Strawberry",
      sku: "PT004",
      category: "Fruits",
      brand: "N/D",
      price: "150.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
    {
      id: 5,
      image: AvocatImage,
      productName: "Avocat",
      sku: "PT005",
      category: "Fruits",
      brand: "N/D",
      price: "1 500.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
    {
      id: 6,
      image: MacbookIcon,
      productName: "Macbook pro",
      sku: "PT006",
      category: "Computer",
      brand: "N/D",
      price: "1500.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
    {
      id: 7,
      image: EarpodIcon,
      productName: "Apple Earpods",
      sku: "PT007",
      category: "Computer",
      brand: "N/D",
      price: "1500.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
    {
      id: 8,
      image: IphoneIcon,
      productName: "iPhone 11",
      sku: "PT008",
      category: "Computer",
      brand: "N/D",
      price: "1500.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
    {
      id: 9,
      image: SamsungIcon,
      productName: "Samsung",
      sku: "PT009",
      category: "Computer",
      brand: "N/D",
      price: "120.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
    {
      id: 10,
      image: EarpodIcon,
      productName: "Banana",
      sku: "PT0010",
      category: "Computer",
      brand: "N/D",
      price: "4500.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
    {
      id: 11,
      image: MacbookIcon,
      productName: "Macbook pro",
      sku: "PT0011",
      category: "Computer",
      brand: "N/D",
      price: "1550.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
    {
      id: 12,
      image: AvocatImage,
      productName: "Avocat",
      sku: "PT0012",
      category: "Computer",
      brand: "N/D",
      price: "1505.00",
      unit: "pc",
      qty: "100.00",
      createdBy: "Admin",
    },
  ]);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#" className="product-img">
            <img alt="" src={record.image} />
          </Link>
          <Link to="#" style={{ fontSize: "15px", marginLeft: "10px" }}>
            {record.productName}
          </Link>
        </div>
      ),
      sorter: (a, b) => a.productName.length - b.productName.length,
    },
    // {
    //   title: "SKU",
    //   dataIndex: "sku",
    //   sorter: (a, b) => a.sku.length - b.sku.length,
    // },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },

    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price.length - b.price.length,
    },

    {
      title: "In Stock",
      dataIndex: "qty",
      sorter: (a, b) => a.qty.length - b.qty.length,
    },

    {
      title: "Action",
      render: (data) => (
        <>
          <>
            <span
              onClick={() => {
                setProduct(data);
                handleProductDetailsModal();
              }}
              className="me-3 pointer"
            >
              <img src={EyeIcon} alt="img" />
            </span>

            {location.pathname === "/admin" && (
              <>
                <a
                  className="me-3"
                  onClick={() => {
                    setProduct(data);
                    handleEditProductModal();
                  }}
                >
                  <img src={EditIcon} alt="img" />
                </a>
                <span
                  className="confirm-text pointer"
                  onClick={async () => {
                    const response = await fetch(
                      "http://localhost:4000/api/products/" + data._id,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${user.token}`,
                        },
                      }
                    );
                    const json = await response.json();
                    if (response.ok) {
                      setRefetchFlagForProducts(!refetchFlagForProducts);
                    }
                  }}
                >
                  <img src={DeleteIcon} alt="img" />
                </span>
              </>
            )}
          </>
        </>
      ),
    },
  ];
  const [addProductModal, setAddProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);

  const handleProductModal = () => setAddProductModal(!addProductModal);
  const handleEditProductModal = () => setEditProductModal(!editProductModal);

  const handleProductDetailsModal = () =>
    setProductDetailModal(!productDetailModal);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          {/* Header */}
          <div className="page-header">
            <div className="page-title">
              <h4>Product List</h4>
              <h6>Manage your products</h6>
            </div>
            {/* add new product */}
            {location.pathname === "/admin" && (
              <div className="page-btn ">
                <a className="btn btn-added" onClick={handleProductModal}>
                  <img src={PlusIcon} alt="img" className="me-1" />
                  Add New Product
                </a>
              </div>
            )}
          </div>

          {/* /product list */}
          <div className="card">
            <div className="card-body">
              <Tabletop inputfilter={inputfilter} togglefilter={togglefilter} />
              {/* /Filter */}
              <div
                className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
                id="filter_inputs"
                style={{ display: inputfilter ? "block" : "none" }}
              >
                <div className="card-body pb-0">
                  <div className="row">
                    <div className="col-lg-12 col-sm-12">
                      <div className="row">
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options}
                              options={{
                                placeholder: "Choose Product",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 col-12">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options2}
                              options={{
                                placeholder: "Choose Category",
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-lg col-sm-6 col-12 ">
                          <div className="form-group">
                            <Select2
                              className="select"
                              data={options5}
                              options={{
                                placeholder: "Price",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-1 col-sm-6 col-12">
                          <div className="form-group">
                            <a className="btn btn-filters ms-auto">
                              <img src={search_whites} alt="img" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* /Filter */}

              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={products?.map((elem) => ({
                    ...elem,
                    image: `http://localhost:4000/${elem.imageUrl}`,
                    productName: elem.name,
                    qty: elem.quantity,
                  }))}
                  //             id: 1,
                  // image: MacbookIcon,
                  // productName: "Macbook pro",
                  // sku: "PT001",
                  // category: "Computer",
                  // brand: "N/D",
                  // price: "1500.00",
                  // unit: "pc",
                  // qty: "100.00",
                  // createdBy: "Admin",
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
          {/* /product list */}
        </div>
      </div>
      {/* Add Product Modal */}
      <Modal show={addProductModal} onHide={handleProductModal} size="xl">
        <Modal.Body>
          <AddProduct
            refetchFlagForProducts={refetchFlagForProducts}
            setRefetchFlagForProducts={setRefetchFlagForProducts}
            setAddProductModal={setAddProductModal}
            categories={categories}
            customSpace="m-0 p-0"
          />
        </Modal.Body>
      </Modal>
      {/* Edit Product Modal */}
      <Modal show={editProductModal} onHide={handleEditProductModal} size="xl">
        <Modal.Body>
          <EditProduct
            product={product}
            setProduct={setProduct}
            refetchFlagForProducts={refetchFlagForProducts}
            setRefetchFlagForProducts={setRefetchFlagForProducts}
            setAddProductModal={setEditProductModal}
            categories={categories}
            customSpace="m-0 p-0"
          />
        </Modal.Body>
      </Modal>

      {/* Product Details Modal */}
      <Modal
        show={productDetailModal}
        onHide={handleProductDetailsModal}
        size="xl"
      >
        <Modal.Body>
          <ProductDetails
            customSpace="m-0 p-0"
            product={product}
            setProduct={setProduct}
            refetchFlagForProducts={refetchFlagForProducts}
            setRefetchFlagForProducts={setRefetchFlagForProducts}
            setAddProductModal={setEditProductModal}
            categories={categories}
            // product={product}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ProductList;
