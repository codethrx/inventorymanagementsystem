import React, { useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../context/auth";
// setAddCategoryModal={setAddCategoryModal} refetchFlag={refetchFlag} setRefetchFlag={setRefetchFlag} customSpace="m-0 p-0"
const AddCategory = (props) => {
  const [input, setInput] = useState({ name: "", description: "" });
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    setLoading(true);
    setError(null);
    if (!input.name || !input.description) {
      alert("");
    }
    const response = await fetch("http://localhost:4000/api/categories", {
      method: "POST",
      body: JSON.stringify({ ...input }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json);
    }
    if (response.ok) {
      props.setRefetchFlag(!props.refetchFlag);
      console.log("Added", json);
      setLoading(false);
      setError(null);
      props.setAddCategoryModal(false);
    }
    setLoading(false);
  };
  return (
    <>
      <div className={`page-wrapper ${props.customSpace}`}>
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Product Add Category</h4>
              <h6>Create new product Category</h6>
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
                {error && <p>{error.error}</p>}
                <div className="col-lg-12">
                  <button
                    className="btn btn-submit "
                    disabled={loading}
                    onClick={submit}
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
AddCategory.propTypes = {
  customSpace: PropTypes.string.isRequired, // Assuming customSpace is a string
};

export default AddCategory;
