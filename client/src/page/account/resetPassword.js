import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MailIcon, LoginImage } from "../../EntryFile/imagePath";

const ResetPass = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pass, setPass] = React.useState("");
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (value) {
      alert("Password reset completed.");
      navigate("/");
    }
    if (error) {
    }
  }, [error, value]);
  const submit = async () => {
    setLoading(true);
    const response = await fetch(
      "http://localhost:4000/api/user/resetpassword/" + token,
      {
        method: "PUT",
        body: JSON.stringify({ password: pass }),
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
                  <h3>Reset password?</h3>
                  <h4>
                    Don’t warry! it happens. Please enter the address <br />
                    associated with your account.
                  </h4>
                </div>
                <div className="form-login">
                  <label>New Password</label>
                  <div className="form-addons">
                    <input
                      type="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      placeholder="Enter your email address"
                    />
                    <img src={MailIcon} alt="img" />
                  </div>
                </div>
                {error && <p>{error}</p>}
                <div className="form-login">
                  <button
                    // type="submit"
                    className="btn btn-login"
                    onClick={submit}
                    loading={loading}
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

export default ResetPass;
