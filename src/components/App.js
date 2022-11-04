import React from "react";
import {useEffect, useState } from "react";
import AppRouter from "./Router";
import {authService} from "../firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() =>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(user);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])

  console.log(authService.currentUser);
  return (
    <>
    {init ? (<AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> 
    ):(
       "initializing..."
      )}
    <footer>&copy; {new Date().getFullYear()}nwitter</footer>
  </>
  )
}

export default App;
