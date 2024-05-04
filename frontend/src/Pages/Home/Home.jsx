import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import firebase_app from '../../Firebase';
import axios from 'axios';

const Home = () => {
  const firebaseAuth = getAuth(firebase_app);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUser = async (token) => {
    try {
      const response = await axios.get("http://localhost:3001/api/user/user_info", {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching user info");
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          getUser(token);
          console.log('Firebase ID token:', token);
        }).catch((error) => {
          console.error('Error getting Firebase ID token:', error);
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className='relative m-12'>
        {userData && (
          <>
            {/* Display cover photo */}
            {userData.cover_photo && (
              <img src={userData.cover_photo} alt="Cover Photo" 
              className='w-full border-4 h-80 rounded-2xl ' />
            )}

            {/* Display profile photo */}
            {userData.profile_photo && (
              <img src={userData.profile_photo} alt="Profile Photo" 
              className='absolute top-48 left-1/2 transform -translate-x-1/2 rounded-full w-60 h-60 border-4 border-black' />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
