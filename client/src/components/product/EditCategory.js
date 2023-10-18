/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Samsung, Upload } from "../../EntryFile/imagePath";
import PropTypes from "prop-types";
import { useAuth } from "../../context/auth";

const EditCategory = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [input, setInput] = useState({
    name: props?.category.name,
    description: props?.category.description,
  });
  console.log(props);
  const submit = async () => {
    if (!input?.name || !input?.description) {
      alert("Enter all fields to continue");
      return;
    }
    setLoading(true);
    setError(null);
    if (!props.category._id) {
      alert("Error");
      return;
    }
    // formData.append("imageUrl", file);
    const response = await fetch(
      "http://localhost:4000/api/categories/" + props?.category?._id,
      {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json);
    }
    if (response.ok) {
      props.setRefetchFlag(!props.refetchFlag);
      console.log("Added", json);
      setLoading(false);
      setError(null);
      // props.setCategory(null);
      props.setEditCategoryModal(false);
    }
    setLoading(false);
  };
  return (
    <>
      <div className={`page-wrapper ${props.customSpace}`}>
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Edit Category</h4>
              <h6>Edit a product Category</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Category Name</label>
                    <input
                      type="text"
                      value={input.name}
                      onChange={(e) =>
                        setInput({ ...input, name: e.target.value })
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
                {error && <h2>{error?.error}</h2>}
                <div className="col-lg-12">
                  <button
                    onClick={submit}
                    disabled={loading}
                    className="btn btn-submit me-2"
                  >
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

EditCategory.propTypes = {
  customSpace: PropTypes.string.isRequired, // Assuming customSpace is a string
};

export default EditCategory;
