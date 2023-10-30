import React, { useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import { useAuth } from "../../context/auth";
const AddStore = (props) => {
  const { user } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const type = "Sales Person";
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [file, setFile] = useState(null);
  // console.log(file);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const submit = async () => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ ...input, type, adminId: user?.id }),
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${user.token}`
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
              <h4>Salesman Management</h4>
              <h6>Add/Update Salesman</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Salesman Name</label>
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
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      value={input.email}
                      onChange={(e) =>
                        setInput({ ...input, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {error && <p>{error?.error}</p>}
                <div className="col-lg-12">
                  <button
                    disabled={loading}
                    onClick={submit}
                    className="btn btn-submit me-2"
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-cancel"
                    onClick={() => props.setAddStoreModal(false)}
                  >
                    Cancel
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

export default AddStore;
