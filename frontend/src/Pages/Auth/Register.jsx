import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../Firebase";
import { countryList } from "../../Data/Countrylist";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const send_form_data = async (formData) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formData.Email,
        formData.Password
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center md:h-screen drop-shadow-2xl border-2">
      <div className="w-full max-w-xl bg-white rounded-lg  md:mt-0  p-6">
        <div className="text-center">
          <h2 className="text-4xl tracking-tight">Create New Account</h2>
          <span className="text-sm">
            already have account ?{" "}
            <a href="#" className="text-blue-500">
              <a href="/register">Login</a>
            </a>
          </span>
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
                <div className="w-full  mb-3 md:mb-0 md:w-1/2  md:pr-2">
                  <label className="text-black mt-2 block">
                    Upload Profle Photo
                  </label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    {...register("Profile_photo",{
                        required: "Profile photo is required",
                        validate: (value) => {
                            const acceptedFormats = ['png','jpg','jpeg'];
                            const fileExtension = value[0]?.name.split('.').pop().toLowerCase();
                            if (!acceptedFormats.includes(fileExtension)) {
                                return 'Invalid file format. Only PNG and JPG are allowed.';
                            }
                            return true;
                        }
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
                    {...register("Cover_photo",{
                        required: "cover photo is required",
                        validate: (value) => {
                            const acceptedFormats = ['png','jpg','jpeg'];
                            const fileExtension = value[0]?.name.split('.').pop().toLowerCase();
                            if (!acceptedFormats.includes(fileExtension)) {
                                return 'Invalid file format. Only PNG and JPG are allowed.';
                            }
                            return true;
                        }
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
                    <p className="text-red-500 text-sm">
                      {errors.Country.message}
                    </p>
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
            <div className="flex flex-col mt-2 items-center justify-evenly w-full mt-2">
              <p>Or sign up with</p>
              <button className="flex mt-3 items-center appearance-none border-2 border-black rounded-xl px-4 py-1">
                <img
                  src="data:image/jpeg;base64,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"
                  className="h-8"
                />
                <p className="px-3">Continue with Google</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
