/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import { Samsung, Upload } from "../../EntryFile/imagePath";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import PropTypes from "prop-types";
import { useAuth } from "../../context/auth";
const options1 = [
  { id: 1, text: "Computers", text: "Computers" },
  { id: 2, text: "Mac", text: "Mac" },
];
const options2 = [
  { id: 1, text: "None", text: "None" },
  { id: 2, text: "Option1", text: "Option1" },
];
const options4 = [
  { id: 1, text: "Piece", text: "Piece" },
  { id: 2, text: "Kg", text: "Kg" },
];
const options5 = [
  { id: 1, text: "Choose Tax", text: "Choose Tax" },
  { id: 2, text: "2%", text: "2%" },
];
const options6 = [
  { id: 1, text: "Percentage", text: "Percentage" },
  { id: 2, text: "10%", text: "10%" },
  { id: 2, text: "20%", text: "20%" },
];
const options7 = [
  { id: 1, text: "Active", text: "Active" },
  { id: 2, text: "Open", text: "Open" },
];

const EditProduct = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [input, setInput] = useState({
    name: props.product?.name,
    quantity: props.product?.quantity,
    description: props.product?.description,
    imageUri: props.product?.imageUrl,
    price: props.product?.price,
    category: props.product?.category,
  });
  const [image, setImage] = useState(null);
  console.log(image);
  const submit = async () => {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("quantity", input.quantity);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("price", input.price);
    if (image) {
      formData.append("imageUrl", image);
    }

    const response = await fetch(
      "http://localhost:4000/api/products/" + props.product?._id,
      {
        method: "PUT",
        // body: JSON.stringify({ ...input }),
        body: formData,
        // credentials: "include",
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "application/json",
          // "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json);
    }
    if (response.ok) {
      props.setRefetchFlagForProducts(!props.refetchFlagForProducts);

      setLoading(false);
      setError(null);
      props.setAddProductModal(false);
    }
    setLoading(false);
  };
  return (
    <>
      <div className={`page-wrapper ${props.customSpace}`}>
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Edit</h4>
              <h6>Update your product</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      value={input.name}
                      onChange={(e) =>
                        setInput({ ...input, name: e.target.value })
                      }
                    />
                  </div>
                </div>
                {/* Category */}
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Category</label>
                    {/* <Select2
                      className="select"
                      data={options1}
                      options={{
                        placeholder: "Category",
                      }}
                    /> */}
                    <select
                      value={input.category}
                      onChange={(e) =>
                        setInput({ ...input, category: e.target.value })
                      }
                      name=""
                      id=""
                    >
                      <option value=""></option>
                      {props.categories.map((elem) => (
                        <option key={elem.name} value={elem.name}>
                          {elem.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/*Min Quantity */}
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="text"
                      value={input.quantity}
                      onChange={(e) =>
                        setInput({ ...input, quantity: e.target.value })
                      }
                    />
                  </div>
                </div>{" "}
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      value={input.price}
                      onChange={(e) =>
                        setInput({ ...input, price: e.target.value })
                      }
                    />
                  </div>
                </div>
                {/* Description */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      value={input.description}
                      onChange={(e) =>
                        setInput({ ...input, description: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label> Product Image</label>
                    <div className="image-upload">
                      <input type="file" />
                      <div className="image-uploads">
                        <img
                          onChange={(e) => setImage(e.target.files[0])}
                          src={Upload}
                          alt="img"
                        />
                        <h4>Drag and drop a file to upload</h4>
                      </div>
                    </div>
                  </div>
                </div>
                {error && <p>{error?.error}</p>}
                <div className="col-12">
                  <div className="product-list">
                    <ul className="row">
                      <li>
                        <div className="productviews">
                          <div className="productviewsimg">
                            <img src={props.product.imageUrl} alt="img" />
                          </div>
                          <div className="productviewscontent">
                            <div className="productviewsname">
                              <h2>samsung</h2>
                              <h3>581kb</h3>
                            </div>
                            <a href="#" className="hideset">
                              x
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    onClick={submit}
                    href="#"
                    className="btn btn-submit me-2"
                  >
                    Update
                  </button>
                  <Link to="/productlist" className="btn btn-cancel">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /add */}
        </div>
      </div>
    </>
  );
};
EditProduct.propTypes = {
  customSpace: PropTypes.string.isRequired, // Assuming customSpace is a string
};
export default EditProduct;
