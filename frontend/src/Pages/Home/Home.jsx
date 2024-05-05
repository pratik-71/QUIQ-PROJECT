import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import firebase_app from "../../Firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QR_generator from "../../Component/QR_generator";

const Home = () => {
  const firebaseAuth = getAuth(firebase_app);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/")
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  

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

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        user
          .getIdToken()
          .then((token) => {
            getUser(token);
          })
          .catch((error) => {
            setError("Error getting Firebase ID token");
            setLoading(false);
          });
      } else {
        console.log("No user available");
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return;
  }

  return (
    <>
      <div className="relative md:mx-12">
        <div className="relative">
          {/* Display cover photo */}
          {userData && userData.cover_photo && (
            <img
              src={userData.cover_photo}
              alt="Cover Photo"
              className="w-full border-4 h-80 rounded-2xl drop-shadow-xl"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-10 mt-4">
          <div className="text-center md:text-left">
            <h1 className="my-3 text-lg md:text-2xl font-bold">
              {userData.name.toUpperCase()}
            </h1>
            <h1 className="my-3 text-lg md:text-2xl font-bold">
              {userData.country.toUpperCase()}
            </h1>
            <h1 className="my-3 text-lg md:text-2xl font-bold">
              {userData.email.toUpperCase()}
            </h1>
            <h1 className="my-3 text-lg md:text-2xl font-bold">
              {userData.phone_number}
            </h1>
            <h1 className="my-3 text-md">
              {userData.bio}
            </h1>
          </div>
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
