import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import firebase_app from "../../Firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QR_generator from "../../Component/QR_generator";
import Update_modal from "../Auth/Update_modal";

const Home = ({token}) => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [angleX, setAngleX] = useState(0);
  const [angleY, setAngleY] = useState(0);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [usertoken,setusertoken] = useState("")


  // logout user
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };


  // handle edit profile modal
  const handleEditProfileClick = () => {
    setShowEditProfileModal(true);
  };


  // get user details from server
  const getUser = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/user/user_info",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUserData(response.data);
      setLoading(false);
      navigate(`/${response.data.name}`);
    } catch (error) {
      setError("Error fetching user info");
      setLoading(false);
    }
  };


  // get token from firebase
  useEffect(() => {
            setusertoken(token)
            getUser(token);
    },[]);


  //  handle image parallax effect here
  const handleMouseMove = (event) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;

    const maxAngle = 15;
    let angleX = 0;
    let angleY = 0;

    if (offsetY !== 0) {
      angleX = (offsetY / centerY) * maxAngle;
    } else if (offsetX !== 0) {
      angleX = (offsetX / centerX) * maxAngle;
    }

    if (offsetX !== 0) {
      angleY = (offsetX / centerX) * maxAngle;
    } else if (offsetY !== 0) {
      angleY = (offsetY / centerY) * maxAngle;
    }

    setAngleX(angleX);
    setAngleY(angleY);
  };


  // thing takes time to load so till show this window
  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  return (
    <>
      <div className="relative md:mx-12" onMouseMove={handleMouseMove}>
        <div className="relative">



          {/* Display cover photo */}
          {userData && userData.cover_photo && (
            <img
              src={userData.cover_photo}
              alt="Cover Photo"
              className="w-full border-4 h-80 rounded-2xl drop-shadow-xl"
              style={{
                transform: `rotateX(${angleX}deg) rotateY(${angleY}deg)`,
              }}
            />
          )}



          {/* Logout button */}
          <button
            className="absolute top-0 right-2 mt-2 ml-2 text-white bg-red-500 px-2 py-1 md:px-4 md:py-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>


        {/* Display profile photo */}
        {userData && userData.profile_photo && (
          <img
            src={userData.profile_photo}
            alt="Profile Photo"
            className="drop-shadow-xl absolute top-48 left-[50%] -translate-x-1/2 rounded-full w-40 h-40 md:w-60 md:h-60 border-4 border-black"
          />
        )}
      

        
        {/*  --------------- Grid structure to displau ser data ------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-10 mt-4">
          <div className="text-center md:pr-24 md:text-left">
            

            {/*  handle update profile modal  */}
          <button o onClick={handleEditProfileClick}
          className="my-5 md:my-0 border-0 px-4 py-1 text-white bg-blue-500 rounded-xl" >Edit Profile</button>
          {
              showEditProfileModal && (
                <Update_modal token={usertoken} onClose={() => setShowEditProfileModal(false)} />
              )
            }


            <h1 className="my-3 text-lg md:text-2xl font-bold">
              {userData.name.toUpperCase()}
            </h1>
            <h1 className="my-3 text-lg md:text-xl ">{userData.country}</h1>
            <h1 className="my-3 text-lg md:text-xl ">{userData.email}</h1>
            <h1 className="my-3 text-lg md:text-xl ">
              {userData.phone_number}
            </h1>
            <h1 className="my-3 text-md ">{userData.bio}</h1>
          </div>

          {/* Generate QR code here */}
          <div className="col-span-2 md:col-span-1 text-center">
            <div className="flex flex-col items-center">
              <QR_generator />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
