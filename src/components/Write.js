import React, {useState} from 'react';
import app from '../firebaseConfig'; // Adjust the import path as necessary
import { getDatabase, ref, push, set } from "firebase/database";

function Write() {
    let [inputValue1, setInputValue1] = useState("");
    let [inputValue2, setInputValue2] = useState("");

    const saveData = async () => {
        const db = getDatabase(app);
        const newDataRef = push(ref(db, 'data/players'));
        set(newDataRef, {
            playerName: inputValue1,
            playerDetails: inputValue2
        })
        .then(() => {
            console.log("Data saved successfully!");
            setInputValue1("");
            setInputValue2("");
        })
        .catch((error) => {
            console.error("Error saving data: ", error);
        });
    }

    return (
        <div>
            <input type="text" value={inputValue1} onChange={(e) => setInputValue1(e.target.value)}/>
            <input type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)}/>
            <br/>
            <button onClick={saveData}>Save</button>
        </div>
    )
}

export default Write