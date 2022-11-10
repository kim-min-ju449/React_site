import React from "react";
import { dbService, storageService } from "../firebase";
import {useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) =>{
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async() =>{
        const ok = window.confirm("삭제하시겠습니까");
        console.log(ok);
        if(ok){
            //console.log(nweetObj.id);
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            //console.log(data);
            if(nweetObj.attachmentUrl !== "")
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) =>{
        const {
            target:{value},
        } = event;
        setNewNweet(value);
    };

    const onSubmit = async (event) =>{
        event.preventDefault();
        console.log(nweetObj.id, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({text:newNweet});
        setEditing(false);
    };

    return(
        <div className="nweet">
            {editing ? (
                <>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input onChange={onChange}
                     value={newNweet}
                      required
                      placeholder="Edit your nweet"
                      autoFocus
                      className="formInput"/>
                    <input type="submit" value="Update Nweet" className="formBtn"/>
                </form>
                <button onClick={toggleEditing} className="forBtn cancelBtn">Cancel</button>
                </>
            ):(
                <>
            
            <h4>{nweetObj.text}</h4>
                {/* {isOwner && (
                    
            
                <> */}
                {nweetObj.attachmentUrl && (
                    <img src={nweetObj.attachmentUrl} width="50px" height="50px"/>
                )}
                <div className="nweet__actions">
            <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash}/>
               
                </span>
            <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt}/>
                Edit Nweet</span>
                </div>
            
            {/* </> */}

            </>
            )}
            
                {/* } */}
        </div>
    )
}
export default Nweet;
