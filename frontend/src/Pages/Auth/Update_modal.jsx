import React, { useState } from "react";
import axios from "axios"
import { useForm } from "react-hook-form";
import { countryList } from "../../Data/Countrylist";
import { useNavigate } from "react-router-dom";

const Update_modal = ({ token, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [profileimg, setProfileImg] = useState("");
  const [coverimg, setCoverImg] = useState("");
  const navigate = useNavigate();

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

  const send_form_data = async (formData) => {
    try {
      const response = await axios.put("http://localhost:3001/api/user/update_user", {
        country: formData.Country,
        bio: formData.Bio,
        gender: formData.Gender,
        profile_photo: profileimg,
        cover_photo: coverimg
      }, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response) {
        console.log(response.data.user.name)
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Update Profile</h2>
          <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit(send_form_data)}>
          <div className="flex flex-wrap mx-3 mt-3">


            {/* Profile photo */}
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

                {/* Cover photo */}
                <div className="w-full mb-3 md:mb-0 md:w-1/2 md:pl-2">
                  <label htmlFor="Cover_photo" className="text-black mt-2 block">
                    Upload Cover Photo
                  </label>
                  <input
                    name="cover_photo"
                    type="file"
                    {...register("Cover_photo", {
                        required: "Cover_photo is required",
                      })}
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
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update_modal;
