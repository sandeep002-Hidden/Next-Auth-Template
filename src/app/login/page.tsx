"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisable, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  const onLogin = async () => {
    if (buttonDisable === true) {
      setMessage("Enter Email and Password for Login");
    } else {
      try {
        setLoading(true);
        const response = await axios.post("/api/v1/users/login", user);
        if (response.data.success) {
          setLoading(false);
          setFailure(false);
          setSuccess(true);
          setMessage("Login success");
          router.push("/dashboard");
        } else {
          setSuccess(false);
          setFailure(true);
          setLoading(false);
          setMessage(response.data.message);
          setUser({
            email: "",
            password: "",
          });
        }
      } catch (error: any) {
        console.log("Error", error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <div className="h-screen w-screen dark:bg-black bg-zinc-100 flex justify-center items-center text-white flex-col">
        {loading && (
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </div>
        )}
        <div
          className={`border-2 rounded-2xl p-4 flex justify-center items-center flex-col border-black dark:border-white ${
            success && "border-green-500 border-2"
          } ${failure && "border-red-500"} `}
        >
          <h1 className="text-black dark:text-white font-bold">Login Page</h1>
          <h1 className="text-black dark:text-white">{message}</h1>
          <input
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder={user.email || "email"}
            className="block h-6 p-4 m-4 border text-black bg-white border-black dark:border-white rounded-lg font-semibold text-sm"
          />
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder={user.password || "Password"}
            className="block h-6 p-4 m-4 border text-black bg-white border-black dark:border-white rounded-lg font-semibold text-sm"
          />
          <button
            className={`border-2 text-black dark:text-white text-sm  rounded-lg p-2  mx-6 block dark:border-white border-black ${
              buttonDisable && "opacity-15"
            } `}
            onClick={onLogin}
            disabled={buttonDisable}
          >
            Login
          </button>
          <div>
            <div className="dark:text-white text-black flex flex-col sm:flex-row">
              <p>Does not have an account?</p>
              <Link href="/signup" className="text-purple-400">
                Create an Account
              </Link>
            </div>

            <div className="dark:text-white text-black flex flex-col sm:flex-row">
              Forgot password?
              <Link href="/forgotPassword" className="text-purple-400 ">
                Reset Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
