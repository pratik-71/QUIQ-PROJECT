import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import QR_generator from '../../Component/QR_generator';

const View_profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {name} = useParams()

  const getUser = async (token) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/user/${name}`, {
      });
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching user info");
      setLoading(false);
    }
  };

  useEffect(() => {
     getUser()
  }, []);


  if (loading) {
    return;
  }

  if (error) {
    return;
  }

  return (
    <>
      <div className='relative md:mx-12'>
        {userData && (
          <>
            {/* Display cover photo */}
            {userData.cover_photo && (
              <img src={userData.cover_photo} alt="Cover Photo" 
              className='w-full border-4 h-80 rounded-2xl drop-shadow-xl ' />
            )}

            {/* Display profile photo */}
            {userData.profile_photo && (
              <img src={userData.profile_photo} alt="Profile Photo" 
              className='drop-shadow-xl absolute top-48 left-[50%] left-1/2 transform -translate-x-1/2 rounded-full w-40 h-40 md:w-60 md:h-60 border-4 border-black' />
            )}
          </>
        )}

        <div className='flex mx-10 flex-col md:flex-row justify-center  md:justify-between'>
          <div>
            <h1 className='mt-8 md:my-3 text-center md:text-left text-lg md:text-2xl font-bold  '>{userData.name.toUpperCase()}</h1>
            <h1 className='my-2 md:my-3 text-center md:text-left text-lg md:text-2xl font-bold  '>{userData.country.toUpperCase()}</h1>
          </div>

          <div className='mt-8'>
            <QR_generator/>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default View_profile;
