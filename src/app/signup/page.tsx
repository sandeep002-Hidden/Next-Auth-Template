"use client";
import Link from "next/link";
import React, { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function SignUpPage() {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisable, setButtonDisable] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [mode,setMode]=useState(true)
  useEffect(()=>{
    const theme=localStorage.getItem('theme')
    if(!theme || theme==='light'){
      setMode(true)
    }else if(theme=='dark'){
      setMode(false)
    }
  },[])
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  const verifyEmail = (regX: RegExp, email: String) => {
    if (email.match(regX)) {
      return true;
    } else {
      setMessage("Invalid Email id");
      return false;
    }
  };
  const verifyPass = (regX: RegExp, password: String) => {
    if (password.match(regX)) {
      return true;
    } else {
      setMessage("invalid Password");
      return false;
    }
  };
  const onSignUp = async () => {
    if (buttonDisable === true) {
      alert("Fill the form to signup");
    } else {
      try {
        setLoading(true);
        const emailRegX: RegExp =
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        const passwordRegX: RegExp =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

        if (
          verifyEmail(emailRegX, user.email) &&
          verifyPass(passwordRegX, user.password)
        ) {
          const response = await axios.post("/api/v1/users/signup", user);
          router.push("/login");
        }
      } catch (error: any) {
        console.log("Error occur on SignUp f");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <div className={`h-screen w-screen flex justify-center items-center dark:bg-black bg-zinc-100`}>
        <div className="flex justify-center items-center flex-col  dark:border-white border-black border-2 rounded-2xl p-2">
          <h1 className="dark:text-white text-black text-2xl">
            {loading ? "Signing Up ..." : "SignUp"}
          </h1>
          <h1 className="text-black dark:text-white">{message}</h1>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            placeholder="UserName"
            className=" block h-6 p-4 m-4 border border-black dark:border-white rounded-lg font-semibold text-sm"
          />
          <label htmlFor="email"></label>
          <input
            type="text"
            id="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="email"
            className=" block h-6 p-4 m-4 border border-black dark:border-white rounded-lg font-semibold text-sm"
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder="password"
            className=" block h-6 p-4 m-4 border border-black dark:border-white rounded-lg font-semibold text-sm"
          />
          <button
            className={`border-2 dark:border-white border-black dark:text-white text-black text-sm  rounded-lg p-2  mx-6 block ${buttonDisable && 'opacity-10'}`}
            onClick={onSignUp}
          >
            {buttonDisable ? "fill the form to SignUp" : "SignUp"}
          </button>
          <div className="dark:text-white text-black ">
            Already have an Account? 
            <Link href="/login" className="text-purple-400">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
