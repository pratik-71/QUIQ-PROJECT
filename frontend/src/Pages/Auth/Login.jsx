import React, { useState } from "react";
import { useForm } from "react-hook-form";
import firebase_app, { auth } from "../../Firebase";
import {getAuth,GoogleAuthProvider,signInWithEmailAndPassword,signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {

  const firebaseAuth = getAuth(firebase_app)
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
   
  const userexist = async(data)=>{
    try {
      console.log("token is = ",data.user.accessToken)
      const response = await axios.get(
        "http://localhost:3001/api/user/user_info",
        {
          headers: {
            Authorization: "Bearer " + data.user.accessToken,
          },
        }
      );
      if(response){
        console.log("here it comes")
        navigate("/")
      }
    } catch (error) {
      console.log("here it comes with error")
      navigate("/user_info", { state: { uid: data.user.uid,email:data.user.email } });
    }
  }

  const send_form_data = async (formData) => {
    const { Email, Password } = formData;
    try {
      const cred = await signInWithEmailAndPassword(firebaseAuth, Email, Password);
      if(cred){
        window.localStorage.setItem("isLoggedIn", true);
        console.log(cred)
        navigate("/")
      }

      
    } catch (error) {
      console.log(error);
    }
  };

  const LoginWithGoogle=async()=>{
    await signInWithPopup(firebaseAuth,provider).then((userCred)=>{
     if(userCred){
       window.localStorage.setItem("isLoggedIn",true);
       userexist(userCred)
     }
    })
   }


  return (
    <> 
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="text-center mt-8">
        <div className="flex items-center justify-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-blue-500"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h2 className="text-4xl tracking-tight">Sign in into your account</h2>

        <span className="text-sm">
          or{" "}
          <a href="#" className="text-blue-500">
            <a href="/register">register a new account</a>
          </a>
        </span>
      </div>

      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form
          className="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
          onSubmit={handleSubmit(send_form_data)}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label
                htmlFor="email"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid Email format",
                  },
                })}
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              />
              {errors.Email && (
                <p className="text-red-500 text-sm">{errors.Email.message}</p>
              )}
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <label
                htmlFor="password"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                {...register("Password", {
                  required: "Password is required",
                })}
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              />
              {errors.Password && (
                <p className="text-red-500 text-sm">
                  {errors.Password.message}
                </p>
              )}
            </div>

            <div className="w-full flex items-center justify-between px-3 mb-3 ">
              <label htmlFor="remember" className="flex items-center w-1/2">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-1 bg-white shadow"
                />
                <span className="text-sm text-gray-700 pt-1">Remember Me</span>
              </label>
              <div className="w-1/2 text-right">
                <a href="#" className="text-blue-500 text-sm tracking-tight">
                  Forget your password?
                </a>
              </div>
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <button
                type="submit"
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
              >
                Sign in
              </button>
            </div>

            <div className="flex flex-col items-center justify-evenly w-full mt-2">
              <p>Or sign up with</p>
              <button onClick={()=>LoginWithGoogle()} className="flex mt-3 items-center appearance-none border-2 border-black rounded-xl px-4 py-1">
                <img
                  src="https://image.similarpng.com/very-thumbnail/2021/09/Logo-Search-Google--on-transparent-background-PNG.png"
                  className="h-8"
                />
                <p className="px-3">Continue with Google</p>
              </button>
            </div>

            
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
