/* eslint-disable no-undef */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Upload } from "../../EntryFile/imagePath";

const EditStore = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ fullName: "", password: "", phone: "" });
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const deleteImage = () => {
    $(document).on("click", ".hideset", function () {
      $(this).parent().parent().parent().hide();
    });
  };
  const submit = async () => {
    const data = Object.entries(input)
      .filter(([key, val]) => val)
      .reduce((accum, next) => {
        return { ...accum, [next[0]]: next[1] };
      }, {});
    setLoading(true);
    setError(null);

    // formData.append("imageUrl", file);
    const response = await fetch(
      "http://localhost:4000/api/user/update-store/" + props.storeId,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${user.token}`
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
      props.setStoreId(null);
      props.setAddStoreModal(false);
    }
    setLoading(false);
  };
  return (
    <>
      <div className={`page-wrapper ${props.customSpace}`}>
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Store Management {props.storeId}</h4>
              <h6>Edit/Update Store</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Store Name</label>
                    <input
                      type="text"
                      value={input.fullName}
                      onChange={(e) =>
                        setInput({ ...input, fullName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Password</label>
                    <div className="pass-group">
                      <input
                        type={passwordShown ? "text" : "password"}
                        className=" pass-input"
                        value={input.password}
                        onChange={(e) =>
                          setInput({ ...input, password: e.target.value })
                        }
                      />
                      <span
                        className={`fas toggle-password ${
                          passwordShown ? "fa-eye" : "fa-eye-slash"
                        }`}
                        onClick={togglePassword}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      value={input.phone}
                      onChange={(e) =>
                        setInput({ ...input, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                {error && <p>{error?.error}</p>}
                <div className="col-lg-12">
                  <button
                    disabled={loading}
                    className="btn btn-submit me-2"
                    onClick={submit}
                  >
                    Submit
                  </button>
                  <button className="btn btn-cancel">Cancel</button>
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

export default EditStore;
