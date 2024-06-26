import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import User_info from "./Pages/Auth/User_info";
import Home from "./Pages/Home/Home";
import { useEffect, useState } from "react";
import firebase_app, { auth } from "./Firebase";
import { getAuth } from "firebase/auth";
import View_profile from "./Pages/Home/View_profile";
import Loader from "./Component/Loader";

function App() {

  
  const firebaseAuth = getAuth(firebase_app);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [usertoken,setusertoken] = useState("")


  // validate user token from firebase
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((usercred) => {
      if (usercred) {
        usercred.getIdToken().then((token) => {
          window.localStorage.setItem("isLoggedIn", true);
          setusertoken(token)
          setIsLoggedIn(true);
          setIsLoading(false); 
        });
      } else {
        window.localStorage.setItem("isLoggedIn", false);
        setIsLoggedIn(false);
        setIsLoading(false); 
      }
    },[]);

    return () => {
      unsubscribe();
    };
  }, []);


  if (isLoading) {
    return <><Loader/></>;
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home token={usertoken} /> : <Navigate to="/login" />} />
          <Route path="/user/:name" element={<View_profile/>}/>
          <Route path="/login" element={<Login />} key="login" />
          <Route path="/register" element={<Register />} key="register" />
          <Route path="/user_info" element={isLoggedIn ? <User_info /> : <Navigate to="/login" />} key="user_info" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;