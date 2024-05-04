import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import User_info from "./Pages/Auth/User_info";
import Home from "./Pages/Home/Home";
import { useEffect, useState } from "react";
import firebase_app, { auth } from "./Firebase";
import { getAuth } from "firebase/auth";

function App() {
  const firebaseAuth = getAuth(firebase_app);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((usercred) => {
      if (usercred) {
        console.log(usercred)
        usercred.getIdToken().then((token) => {
          window.localStorage.setItem("isLoggedIn", true);
          setIsLoggedIn(true);
          setIsLoading(false); 
          console.log(token);
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
    return ;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} key="login" />
          <Route path="/register" element={<Register />} key="register" />
          <Route path="/user_info" element={<User_info />} key="user_info" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
