import React from "react";
import { useNavigate } from "react-router-dom";
import { MailIcon, LoginImage } from "../../EntryFile/imagePath";

const ForgetPass = () => {
  const navigate = useNavigate();
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
                    <input type="text" placeholder="Enter your email address" />
                    <img src={MailIcon} alt="img" />
                  </div>
                </div>
                <div className="form-login">
                  <button
                    type="submit"
                    className="btn btn-login"
                    onClick={() => navigate("/login")}
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
