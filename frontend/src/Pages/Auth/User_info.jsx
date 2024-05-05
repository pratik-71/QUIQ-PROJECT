import React, { useState } from "react";
import axios from "axios"
import { useForm } from "react-hook-form";
import { countryList } from "../../Data/Countrylist";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const User_info = () => {

  const location = useLocation();
  const uid = location.state.uid;
  const email = location.state.email;

  console.log(uid)
  console.log(email)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [profileimg, setProfileImg] = useState("");
  const [coverimg, setCoverImg] = useState("");
  const navigate = useNavigate()


  // convert image to base 64
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

 
  // add user to database
  const send_form_data = async ( formData) => {
    try {
      const response = await axios.post("http://localhost:3001/api/user/adduser", {
        name: formData.Name,
        email: email,
        phone_number: formData.Phone_number,
        country: formData.Country,
        uid:uid,
        bio:formData.Bio,
        gender: formData.Gender,
        profile_photo: profileimg,
        cover_photo: coverimg
      });
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center  drop-shadow-2xl border-2">
      <div className="w-full max-w-xl bg-white rounded-lg  md:mt-0  p-6">
        <div className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-12 h-12 text-blue-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
            />
          </svg>
        </div>

        <div className="text-center">
          <h2 className="text-4xl tracking-tight">Personal Info</h2>
        </div>
   

   {/* ------------- Form to provide personal details  ----------------------- */}
        <form onSubmit={handleSubmit(send_form_data)}>
          <div className="flex flex-wrap mx-3 mt-3">


            {/*  Name*/}
            <div className="w-full px-3 mb-3">
              <input
                id="Name"
                name="Name"
                type="text"
                placeholder="Enter Your Name"
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
                    {...register("Profile_photo", {
                      required: "Profile_photo is required",
                    })}
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
                    {...register("Cover_photo", {
                      required: "Cover_photo is required",
                    })}
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


            {/* country */}
            <div className="w-full px-3 mb-3">
              <select
                {...register("Country", {
                  required: "Country is required",
                })}
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                defaultValue=""
              >
                <option disabled value="">
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


             {/* Bio */}
            <div className="w-full px-3 mb-3">
              <textarea
                id="Bio"
                name="Bio"
                type="Bio"
                placeholder="Enter Something about yourself"
                autoComplete="Bio"
                {...register("Bio", {
                  required: "Bio is required"
                })}
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
              ></textarea>
              {errors.Bio && (
                <p className="text-red-500 text-sm">{errors.Bio.message}</p>
              )}
            </div>


             {/* Gender */}
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


            {/* button to sub,it user details */}
            <div className="w-full px-3 mb-3">
              <button
                type="submit"
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User_info;
