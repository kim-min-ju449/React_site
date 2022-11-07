import React from "react";
import {useEffect, useState} from "react";
import {dbService} from "../firebase";
import Nweet from "../components/Nweet";

const Home = ({userObj}) => {
    
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
        
          const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          }));
          setNweets(newArray);
        });
      }, []);
    //console.log(nweets);

    const onSubmit = async (event) =>{
        //console.log(userObj.uid)
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            //creatorId: userObj.uid,
            createdAt: Date.now(),
        });
        setNweet("");
        
    }

    const onChange = (event) =>{
        console.log("onChange() 호출");
        event.preventDefault();
        const{
            target:{value},
        } = event;
        setNweet(value);
    };

    const onFileChange = (event) =>{
       const{
        target:{files},

       } = event;
       const theFile = files[0];
       const reader = new FileReader();
       reader.onloadend = (finishedEvent) =>{
        //console.log(finishedEvent);
            const{
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
       };
       reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => setAttachment("");

    return(
        <>
        <form onSubmit={onSubmit}>
            <input
            value={nweet}
            onChange={onChange}
            text="text"
            placeholder="What is on your mind?"
            maxLength={120}
            />
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="Nweet"/>
            {attachment && (
                <div>
                <img src={attachment} width="50px" height="50px"/>
                <button onClick={onClearAttachment}>Clear</button>
            </div>
            )}
        </form>
        <div>
            {nweets.map((nweet) => (
                // <div key={nweet.id}>
                //    <h4>{nweet.text}</h4> 
                // </div>
                <Nweet
                    key={nweet.id}
                    nweetObj={nweet}/>
                    //isOwner={nweet.creatorId === userObj.uid}
                ///>
               
            ))}
            
            
        </div>
    </>
    
    );
    }


export default Home;
