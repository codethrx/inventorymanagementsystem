/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import PropTypes from "prop-types";
import { useAuth } from "../../context/auth";

const AddProduct = (props) => {
  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
  });
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  console.log(imageUrl);
  console.log(input.category);
  const submit = async () => {
    if (
      !input.name ||
      !input.price ||
      !input.category ||
      !input.quantity ||
      !input.description
      //  ||
      // !imageUrl
    ) {
      alert("Enter all fields to proceed");
      return;
    }
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("quantity", input.quantity);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("price", input.price);
    formData.append("imageUrl", imageUrl);
    formData.append("goals", "abc");
    const response = await fetch("http://localhost:4000/api/products", {
      method: "POST",
      // body: JSON.stringify({ ...input }),
      body: formData,
      // credentials: "include",
      headers: {
        // "Content-Type": "multipart/form-data",
        // Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
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

  // const options = [
  //   { id: 1, text: "Walk-in-Costumer", text: "Walk-in-Costumer" },
  //   { id: 2, text: "Costumer Name", text: "Costumer Name" },
  // ];

  const options =
    props.categories?.map((elem) => ({
      value: elem.name,
      label: elem.name,
    })) || [];

  return (
    <>
      <div className={`page-wrapper ${props.customSpace}`}>
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Add</h4>
              <h6>Create new product</h6>
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
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={input.category}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setInput({ ...input, category: e.target.value });
                      }}
                      name=""
                      id=""
                    >
                      <option value=""></option>
                      {props.categories?.map((elem) => (
                        <option key={elem.name} value={elem.name}>
                          {elem.name}
                        </option>
                      ))}
                    </select>
                    {/* 
                    <Select2
                      data={options}
                      value={input.category}
                      onSelect={(value) =>
                        setInput({ ...input, category: value })
                      }
                      options={{
                        placeholder: "Select a category",
                      }}
                    /> */}
                  </div>
                </div>
                {/*                
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Unit</label>
                    <Select2
                      className="select"
                      data={options3}
                      options={{
                        placeholder: "Choose Unit",
                      }}
                    />
                  </div>
                </div> */}
                {/* <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>SKU</label>
                    <input type="text" />
                  </div>
                </div> */}
                {/* <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Minimum Qty</label>
                    <input type="text" />
                  </div>
                </div> */}
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      value={input.quantity}
                      onChange={(e) =>
                        setInput({
                          ...input,
                          quantity: e.target.value,
                        })
                      }
                      type="text"
                    />
                  </div>
                </div>
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
                      <input
                        type="file"
                        onChange={(e) => setImageUrl(e.target.files[0])}
                      />
                      <div className="image-uploads">
                        <img src={Upload} alt="img" />
                        <h4>Drag and drop a file to upload</h4>
                      </div>
                    </div>
                  </div>
                </div>
                {error && <p>{error.error}</p>}
                <div className="col-lg-12">
                  <button onClick={submit} className="btn btn-submit me-2">
                    Submit
                  </button>
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
AddProduct.propTypes = {
  customSpace: PropTypes.string.isRequired, // Assuming customSpace is a string
};
export default AddProduct;
