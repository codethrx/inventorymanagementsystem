import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LoginImage, Users1 } from "../../EntryFile/imagePath";
// import { useState } from "react";
const Register = () => {
  const [eye, seteye] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (value) {
      navigate("/");
    }
  }, [value]);
  const onEyeClick = () => {
    seteye(!eye);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password || !input.fullName) {
      alert("Enter all fields to continue");
      return;
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        input.email
      )
    ) {
      alert("Enter a valid email id to continue");
      return;
    }
    // setLoading(true);
    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setError(json.error);
      setValue(null);
    }
    if (response.ok) {
      setError(null);
      setValue(json);
    }
    setLoading(false);
    alert("go");
  };
  return (
    <div>
      <div className="main-wrapper">
        {/* <Helmet>
          <title>SignUp - GoShoppIn</title>
          <meta name="description" content="SignUp page" />
        </Helmet> */}
        <div className="account-content">
          <div className="login-wrapper">
            <div className="login-content">
              <div className="login-userset">
                <form onSubmit={submit}>
                  <div className="login-logo">
                    {/* <img src={Logo} alt="img" /> */}
                  </div>
                  <div className="login-userheading">
                    <h3>Create an Account</h3>
                  </div>
                  <div className="form-login">
                    <label>Full Name</label>
                    <div className="form-addons">
                      <input
                        type="text"
                        value={input.fullName}
                        onChange={(e) =>
                          setInput({ ...input, fullName: e.target.value })
                        }
                        className={`  "is-invalid" : ""}`}
                        placeholder="Enter your full name"
                      />
                      <img src={Users1} alt="img" />
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>
                  <div className="form-login">
                    <label>Email</label>
                    <div className="form-addons">
                      <input
                        type="text"
                        className={`   "is-invalid" : ""}`}
                        placeholder="Enter your email address"
                        value={input.email}
                        onChange={(e) =>
                          setInput({ ...input, email: e.target.value })
                        }
                      />
                      <img src={MailIcon} alt="img" />
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>
                  <div className="form-login">
                    <label>Password</label>
                    <div className="pass-group">
                      <input
                        type={eye ? "password" : "text"}
                        className={`   "is-invalid" : ""}`}
                        placeholder="Enter your password"
                        value={input.password}
                        onChange={(e) =>
                          setInput({ ...input, password: e.target.value })
                        }

                        // className="pass-input"
                      />
                      <span
                        onClick={onEyeClick}
                        className={`fas toggle-password ${
                          eye ? "fa-eye-slash" : "fa-eye"
                        } `}
                      />
                    </div>
                  </div>
                  <div className="form-login">
                    <button type="submit" className="btn btn-login">
                      Sign Up
                    </button>
                  </div>
                  <div className="signinform text-center">
                    <h4>
                      Already a user?{" "}
                      <Link to="/" className="hover-a">
                        Sign In
                      </Link>
                    </h4>
                  </div>
                </form>
              </div>
            </div>
            <div className="login-img">
              <img src={LoginImage} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
