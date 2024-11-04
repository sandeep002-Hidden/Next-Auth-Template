"use client";

import Loading from "../components/loding";
import { useState, useEffect } from "react";
import axios from "axios";

export default function changePassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [seeOtp, setSeeOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });
  useEffect(() => {
    setLoading(false);
    setMessage("");
    setButtonDisable(false);
    setSuccess(false);
    setFailure(false);
    setSeeOtp(false);
    setOtp("");
  }, [verified]);

  useEffect(() => {
    if (userEmail.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [userEmail]);
  useEffect(() => {
    if (
      password.newPassword.length > 0 &&
      password.newPasswordConfirm.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [password]);

  const VerifyEmail = async () => {
    if(buttonDisable){
      setMessage("Enter Your Email")
      return
    }
    setLoading(true);
    setButtonDisable(true)
    try {
      if (!buttonDisable) {
        await axios
          .post("/api/v1/users/checkUser", { email: userEmail })
          .then((a) => {
            setMessage(a.data.message);
            if (a.data.success) {
              setFailure(false);
              setSuccess(true);
              setLoading(false);
              setSeeOtp(true);
              setButtonDisable(false)
            } else {
              setSuccess(false);
              setFailure(true);
              setLoading(false);
              setButtonDisable(false)
            }
          });
      } else {
        setMessage("Enter Your Email");
      }
    } catch (error: any) {
      console.log(error.message);
      setFailure(true);
    } finally {
      setLoading(false);
      setButtonDisable(false)
    }
  };

  const verifyOtp = async () => {
    if(buttonDisable){
      setMessage("Enter The Otp")
      return
    }
    const reqObj = { email: userEmail, otp: otp };
    await axios.post("/api/v1/users/checkOtp", reqObj).then((res) => {
      setMessage(res.data.message);
      if (res.data.success) {
        setFailure(false);
        setSuccess(true);
        setLoading(false);
        setVerified(true);
      } else {
        setSuccess(false);
        setFailure(true);
        setLoading(false);
      }
    });
  };

  const setNewPassword = async () => {
    if(buttonDisable){
      setMessage("Enter a new password")
      return;
    }
    setLoading(true);
    const passwordRegX: RegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (password.newPassword.match(passwordRegX)) {
      if (password.newPassword === password.newPasswordConfirm) {
        try {
          await axios
            .post("/api/v1/users/changePassword", {
              email: userEmail,
              password: password.newPassword,
            })
            .then((cPR) => {
              setLoading(false);
              if (cPR.data.success) {
                setFailure(false);
                setSuccess(true);
                setMessage("Password Changed Success fully");
              } else {
                setSuccess(false);
                setFailure(true);
                setMessage("Error occur while Changing password");
              }
            });
        } catch (error: any) {
          console.log(error.message);
          setLoading(false);
          setSuccess(false);
          setFailure(true);
          setMessage("Error Occur while Changing password");
        }
      } else {
        setMessage("Both Password are not equal");
      }
    } else {
      setMessage(
        "Password must Contain an UpperCase ,an LowerCase a digit and minimum length 8"
      );
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center min-h-screen flex-1 bg-zinc-100 dark:bg-black flex-col">
          {loading && <Loading />}
          <h1 className="dark:text-white text-black">{message}</h1>
          {!verified && (
            <div
              className={`border-2 rounded-2xl p-4 flex justify-center items-center flex-col border-black dark:border-white ${
                success && "border-green-500 border-2"
              } ${failure && "border-red-500"} `}
            >
              <input
                type="email"
                placeholder={"Enter Your Email"}
                className="block h-6 p-4 m-4 border dark:text-white text-black border-black dark:border-white  rounded-lg font-semibold text-sm"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
              {seeOtp && (
                <input
                  type="number"
                  placeholder={"Enter Otp"}
                  className="block h-6 p-4 m-4 border dark:text-white text-black border-black dark:border-white  rounded-lg font-semibold text-sm"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              )}
              <button
                className={`border-2 rounded-lg p-2 border-black dark:border-white ${
                  buttonDisable && "opacity-10"
                }`}
                onClick={seeOtp ? verifyOtp : VerifyEmail}
              >
                Submit
              </button>
            </div>
          )}
          {verified && (
            <div
              className={`border-2 rounded-2xl p-4 flex justify-center items-center flex-col border-black dark:border-white ${
                success && "border-green-500 border-2"
              } ${failure && "border-red-500"}`}
            >
              <input
                type="text"
                className="block h-6 p-4 m-4 border-2 text-black border-black dark:border-white  rounded-lg font-semibold text-sm"
                placeholder="Enter a new Password"
                onChange={(e) => {
                  setPassword({ ...password, newPassword: e.target.value });
                }}
              />
              <input
                type="password"
                className="block h-6 p-4 m-4 border-2 text-balck border-black dark:border-white  rounded-lg font-semibold text-sm"
                placeholder="Confirm New Password"
                onChange={(e) => {
                  setPassword({
                    ...password,
                    newPasswordConfirm: e.target.value,
                  });
                }}
              />
              <button
                className={`border-2 rounded-lg p-2 border-black dark:border-white ${buttonDisable&& 'opacity-10'} `}
                onClick={setNewPassword}
              >
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
