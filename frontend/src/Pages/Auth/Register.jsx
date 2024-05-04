import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import firebase_app, { auth } from "../../Firebase";
import { countryList } from "../../Data/Countrylist";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const firebaseAuth = getAuth(firebase_app);
  const provider = new GoogleAuthProvider();

  const [profileimg, setProfileImg] = useState("");
  const [coverimg, setCoverImg] = useState("");

  const convertToBase64 = (file, setImage) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error" + error);
    };
  };


  const sendUserData = async (uid, formData) => {
    try {
      const response = await axios.post("http://localhost:3001/api/user/adduser", {
        name: formData.Name,
        email: formData.Email,
        phone_number: formData.Phone_number,
        uid:uid,
        country: formData.Country,
        gender: formData.Gender,
        profile_photo: profileimg,
        cover_photo: coverimg
      });
      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const loginWithGoogle = async (formData) => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        window.localStorage.setItem("isLoggedIn", true);
        navigate("/user_info", { state: { uid: userCred.user.uid,email:formData.Email } });
      }
    });
  };
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendFormData = async (formData) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, formData.Email, formData.Password);
      if (response) {
        console.log(response.user)
        sendUserData(response.user.uid, formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center drop-shadow-2xl border-2">
      <div className="w-full max-w-xl bg-white rounded-lg  md:mt-0  py-6">
        <div className="text-center">
          <h2 className="text-4xl tracking-tight">Create New Account</h2>
          <span className="text-sm">
            already have account ?{" "}
            <a href="#" className="text-blue-500">
              <a href="/">Login</a>
            </a>
          </span>
        </div>

        <form onSubmit={handleSubmit(sendFormData)}>
          <div className="flex flex-wrap mx-3 mt-3">
            {/*  Name*/}
            <div className="w-full px-3 mb-3">
              <input
                id="Name"
                name="Name"
                type="text"
                placeholder="Enter Your Username"
                {...register("Name", {
                  required: "Name is required",
                })}
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              />
              {errors.Name && (
                <p className="text-red-500 text-sm">{errors.Name.message}</p>
              )}
            </div>

            {/* phone number */}
            <div className="w-full px-3 mb-3">
              <input
                id="Phone_number"
                name="Phone_number"
                type="number"
                placeholder="Enter Phone Number"
                {...register("Phone_number", {
                  required: "Phone number is required",
                  min: {
                    value: 1000000000,
                    message: "Phone Number must be at least 10 digits long",
                  },
                  max: {
                    value: 9999999999,
                    message: "Phone Number must not exceed 10 digits",
                  },
                })}
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              />
              {errors.Phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.Phone_number.message}
                </p>
              )}
            </div>

            {/* email */}
            <div className="w-full px-3 mb-3">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                autoComplete="email"
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

            {/* password */}
            <div className="w-full px-3">
              <input
                id="Password"
                name="Password"
                type="password"
                placeholder="Enter Password"
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

            
             {/* profile photo */}
             <div className="w-full px-3 mb-3">
              <div className="flex flex-wrap justify-between">
                <div className="w-full mb-3 md:mb-0 md:w-1/2 md:pr-2">
                  <label className="text-black mt-2 block">
                    Upload Profile Photo
                  </label>
                  <input
                    name="profile_photo"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => convertToBase64(e.target.files[0], setProfileImg)}
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                  />
                  {errors.Profile_photo && (
                    <p className="text-red-500 text-sm">
                      {errors.Profile_photo.message}
                    </p>
                  )}
                </div>

                {/* Cover photo  */}
                <div className="w-full mb-3 md:mb-0 md:w-1/2 md:pl-2">
                  <label htmlFor="Cover_photo" className="text-black mt-2 block">
                    Upload Cover Photo
                  </label>
                  <input
                    name="cover_photo"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => convertToBase64(e.target.files[0], setCoverImg)}
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                  />
                  {errors.Cover_photo && (
                    <p className="text-red-500 text-sm">
                      {errors.Cover_photo.message}
                    </p>
                  )}
                </div>
              </div>
            </div>


            <div className="w-full px-3 mb-3">
              <select
                {...register("Country", {
                  required: "Country is required",
                })}
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                defaultValue=""
              >
                <option disabled value="" className="text-slate-100">
                  Select your Country
                </option>
                {countryList.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.Country && (
                <p className="text-red-500 text-sm">{errors.Country.message}</p>
              )}
            </div>

            <div className="mx-4 mb-3 w-full">
              <h3 className="text-black text-lg">Select Your Gender</h3>
              <form
                {...register("Gender", {
                  required: "Gender is required",
                })}
              >
                <div className="text-center">
                  <div className="flex items-center justify-evenly">
                    <div className="flex">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        {...register("Gender")}
                      />
                      <label htmlFor="male" className="text-lg px-2">Male</label>
                    </div>
                    <div className="flex">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        {...register("Gender")}
                      />
                      <label htmlFor="female" className="text-lg px-2">Female</label>
                    </div>
                    <div className="flex">
                      <input
                        type="radio"
                        id="other"
                        name="gender"
                        value="other"
                        {...register("Gender")}
                      />
                      <label htmlFor="other" className="text-lg px-2">Other</label>
                    </div>
                  </div>
                </div>
              </form>
              {errors.Gender && (
                <p className="text-red-500 text-sm">{errors.Gender.message}</p>
              )}
            </div>

            <div className="w-full px-3 mb-3">
              <button
                type="submit"
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
              >
                Sign Up
              </button>
            </div>

            {/* google sign up */}
            
          </div>
        </form>

        <div className="flex flex-col items-center justify-evenly w-full mt-2">
              <p>Or sign up with</p>
              <button onClick={loginWithGoogle} className="flex mt-3 items-center appearance-none border-2 border-black rounded-xl px-4 py-1">
                <img
                  src="https://image.similarpng.com/very-thumbnail/2021/09/Logo-Search-Google--on-transparent-background-PNG.png"
                  className="h-8"
                  alt="Google Logo"
                />
                <p className="px-3">Continue with Google</p>
              </button>
            </div>
            
      </div>
    </div>
  );
};

export default Register;
