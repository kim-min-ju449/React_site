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

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  console.log(authService.currentUser);
  return (
    <>
    {/* {init ? (<AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> 
    ):(
       "initializing..."
      )} */}
    {/* <footer>&copy; {new Date().getFullYear()}nwitter</footer> */}
    {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "initializing..."
      )}
  </>
  )
}

export default App;
