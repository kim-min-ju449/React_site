import React from "react";
import {useEffect, useState} from "react";
import {dbService, storageService} from "../firebase";
import Nweet from "../components/Nweet";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({userObj}) =>{

    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");


    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
        //   const attachmentRef = storageService
        //     .ref()
        //     .child(`${userObj.uid}/${uuidv4()}`);
        const attachmentRef = storageService.ref().child(`$gs://nwitter-68dad.appspot.com//${uuidv4()}`);
          const response = await attachmentRef.putString(attachment, "data_url");
          attachmentUrl = await response.ref.getDownloadURL();
        }
        await dbService.collection("nweets").add({
          text: nweet,
          createdAt: Date.now(),
          creatorId: Date.now(),
          attachmentUrl,
        });
        setNweet("");
        setAttachment("");
      };

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
    <form onSubmit={onSubmit}>
        <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind"
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
)
}

export default NweetFactory;