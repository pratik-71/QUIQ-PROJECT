import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import QR_generator from "../../Component/QR_generator";

const View_profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name } = useParams();
  const [angleX, setAngleX] = useState(0);
  const [angleY, setAngleY] = useState(0);


  // get user details from databse
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/user/${name}`
        );
        setUserData(response.data);
      } catch (error) {
        setError("Error fetching user info");
      } finally {
        setLoading(false);
      }
    };
 

    // handle text paraallax effect
    const handleMouseMove = (event) => {
      // Calculate distances from the mouse pointer to the center of the screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = event.clientX - centerX;
      const offsetY = event.clientY - centerY;

      // Calculate tilt angles based on mouse position
      const maxAngle = 10; // Maximum tilt angle
      let angleX = 0;
      let angleY = 0;

      // Calculate angle for X-axis
      if (offsetY !== 0) {
        angleX = (offsetY / centerY) * maxAngle;
      } else if (offsetX !== 0) {
        angleX = (offsetX / centerX) * maxAngle;
      }

      // Calculate angle for Y-axis
      if (offsetX !== 0) {
        angleY = (offsetX / centerY) * maxAngle;
      } else if (offsetY !== 0) {
        angleY = (offsetY / centerX) * maxAngle;
      }

      setAngleX(angleX);
      setAngleY(angleY);
    };

    getUser();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  // loading 
  if (loading) {
    return null;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="relative md:mx-12">
        {userData && (
          <>
            <div>


              {/* Display cover photo */}
              {userData.cover_photo && (
                <img
                  src={userData.cover_photo}
                  alt="Cover Photo"
                  className="w-full border-4 h-80 rounded-2xl drop-shadow-xl"
                  style={{
                    transform: `rotateX(${angleX}deg) rotateY(${angleY}deg)`,
                  }}
                />
              )}



              {/* Display profile photo */}
              {userData.profile_photo && (
                <img
                  src={userData.profile_photo}
                  alt="Profile Photo"
                  className="drop-shadow-xl absolute top-48 left-[50%] -translate-x-1/2 rounded-full w-40 h-40 md:w-60 md:h-60 border-4 border-black"
                />
              )}
            </div>

             
             {/* --------------- Grid structure to display user data ------------ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-10 mt-4">
              <div className="text-center md:text-left">
                <h1 className="my-3 text-lg md:text-2xl font-bold">
                  {userData.name.toUpperCase()}
                </h1>
                <h1 className="my-3 text-lg md:text-xl">
                  {userData.country.toUpperCase()}
                </h1>
                <h1 className="my-3 text-md">{userData.bio}</h1>
              </div>


              {/* Generate QR code  */}
              <div className="col-span-2 md:col-span-1 text-center">
                <div className="flex flex-col items-center">
                  <QR_generator />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default View_profile;
