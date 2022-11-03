import React from "react";
import {useEffect, useState} from "react";
import {dbService} from "../firebase";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () =>{
        const dbNweets = await dbService.collection("nweets").get();
        //console.log(dbNweets);
        console.log("getNweets() 실행");
        dbNweets.forEach((document) => {
            //console.log(document.data());
            const nweetObject = { ...document.data(), id:document.id};
            setNweets((prev) => [nweetObject, ...prev])
        
    });
    };

    useEffect(() =>{
        getNweets();
        console.log("유즈이펙트 호출");
    },[]);
    //console.log(nweets);

    const onSubmit = async (event) =>{
        console.log("onSubmit() 호출");
        event.preventDefault();
        await dbService.collection("nweets").add({
            text:nweet,
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
            <input type="submit" value="Nweet"/>
        </form>
        <div>
            {nweets.map((nweet) => (
                <div key={nweet.id}>
                    <h4>{nweet.text}</h4> 
                </div>
            ))}
        </div>
    </>
    );



};



export default Home;