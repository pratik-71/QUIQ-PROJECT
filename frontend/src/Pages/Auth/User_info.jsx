import React from "react";
import { useForm } from "react-hook-form";
import { countryList } from "../../Data/Countrylist";

const User_info = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const send_form_data = async (formData) => {};

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
                <div className="w-full  mb-3 md:mb-0 md:w-1/2  md:pr-2">
                  <label className="text-black mt-2 block">
                    Upload Profle Photo
                  </label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    {...register("Profile_photo", {
                      required: "Profile photo is required",
                      validate: (value) => {
                        const acceptedFormats = ["png", "jpg", "jpeg"];
                        const fileExtension = value[0]?.name
                          .split(".")
                          .pop()
                          .toLowerCase();
                        if (!acceptedFormats.includes(fileExtension)) {
                          return "Invalid file format. Only PNG and JPG are allowed.";
                        }
                        return true;
                      },
                    })}
                    className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                  />
                  {errors.Profile_photo && (
                    <p className="text-red-500 text-sm">
                      {errors.Profile_photo.message}
                    </p>
                  )}
                </div>

                {/* Cover photo  */}
                <div className="w-full  mb-3 md:mb-0 md:w-1/2  md:pl-2">
                  <label
                    htmlFor="Cover_photo"
                    className="text-black mt-2 block"
                  >
                    Upload Cover Photo
                  </label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    {...register("Cover_photo", {
                      required: "cover photo is required",
                      validate: (value) => {
                        const acceptedFormats = ["png", "jpg", "jpeg"];
                        const fileExtension = value[0]?.name
                          .split(".")
                          .pop()
                          .toLowerCase();
                        if (!acceptedFormats.includes(fileExtension)) {
                          return "Invalid file format. Only PNG and JPG are allowed.";
                        }
                        return true;
                      },
                    })}
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
                  Select your product category
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
