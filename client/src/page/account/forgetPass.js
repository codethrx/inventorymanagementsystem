import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MailIcon, LoginImage } from "../../EntryFile/imagePath";

const ForgetPass = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = React.useState("");
  const [value, setValue] = useState(null);
  const submit = async () => {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test()
    ) {
      alert("Enter a valid email id to continue");
      return;
    }
    setLoading(true);
    const response = await fetch(
      "http://localhost:4000/api/user/forgetPassword",
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
      alert("Verification email sent. Check email to verify.");
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="main-wrapper">
        {/* <Helmet>
          <title>Forgot Password - GoShoppIn</title>
          <meta name="description" content="ForgetPassword page" />
        </Helmet> */}
        <div className="account-content">
          <div className="login-wrapper">
            <div className="login-content">
              <div className="login-userset ">
                <div className="login-userheading">
                  <h3>Forgot password?</h3>
                  <h4>
                    Don’t warry! it happens. Please enter the address <br />
                    associated with your account.
                  </h4>
                </div>
                <div className="form-login">
                  <label>Email</label>
                  <div className="form-addons">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Enter your email address"
                    />
                    <img src={MailIcon} alt="img" />
                  </div>
                </div>
                {error && <p>{error}</p>}
                <div className="form-login">
                  <button
                    type="submit"
                    className="btn btn-login"
                    onClick={submit}
                    disabled={loading}
                  >
                    Submit
                  </button>
                </div>
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

export default ForgetPass;
