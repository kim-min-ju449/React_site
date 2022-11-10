import React, { useInsertionEffect } from "react";
import {useState} from "react";
import { authService, firebaseInstance } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter, faGoogle, faGithub} from "@fortawesome/free-brands-svg-icons";
import AuthForm from "../components/AuthForm";

// const Auth = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [newAccount, setNewAccount] = useState('');
//     const [error, setError] = useState('');

//     const onChange = (event) =>{
//         const{
//             target:{name, value},
//         } = event;
//         if(name ==="email"){
//             setEmail(value);
//         }else if(name === "password"){
//             setPassword(value); 
//         }
//     }
//     const onSubmit = async (event) =>{
//         event.preventDefault();
//         try{
//             let data;
//             if(newAccount){
//                 data = await authService.createUserWithEmailAndPassword(email, password);
//             }else{
//                 data = await authService.signInWithEmailAndPassword(email, password);

//             };
//             console.log(data);
//         }catch(error){
//             console.log(error);
//             setError(error.message);
//         }
//     }

//     const toggleAccount = () => setNewAccount((prev) => !prev);

//     const onSocialClick = async (event) =>{
//         const{
//             target:{name},
//         } = event;
//         let provider;
//         if(name === "google"){
//             provider = new firebaseInstance.auth.GoogleAuthProvider();
//         }else if(name === "github"){
//             provider = new firebaseInstance.auth.GithubAuthProvider();
//         }
//         const data = await authService.signInWithPopup(provider);
//         console.log(data);
//     }
    const Auth = () => {
        const onSocialClick = async (event) => {
          const {
            target: { name },
          } = event;
          let provider;
          if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
          } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
          }
          const data = await authService.signInWithPopup(provider);
        };

    // return(
    //     <div>
    //         <form onSubmit={onSubmit}>
    //             <input
    //             name="email"
    //             type="text" 
    //             placeholder="Email" 
    //             required
    //             value={email}
    //             onChange={onChange}/>
    //             <input
    //             name="password"
    //             type="password" 
    //             placeholder="Password"
    //              required
    //              value={password}
    //              onChange={onChange}/>
    //             <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
    //             {error}
                
    //         </form>
    //         <span onClick={toggleAccount}>
    //             {newAccount ? "sign In" : "Create Account"}
    //         </span>
    //         <div>
    //             <button onClick={onSocialClick} name="google">Continue with Google</button>
    //             <button onClick={onSocialClick} name="google">Continue with Github</button>
                
    //         </div>
    //     </div>
    // )
    return (
        <div className="authContainer">
          <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="3x"
            style={{ marginBottom: 30 }}
          />
          <AuthForm />
          <div className="authBtns">
            <button onClick={onSocialClick} name="google" className="authBtn">
              Continue with Google <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button onClick={onSocialClick} name="github" className="authBtn">
              Continue with Github <FontAwesomeIcon icon={faGithub} />
            </button>
          </div>
        </div>
      );
}

export default Auth;