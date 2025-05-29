import React, {useState} from 'react';
import app from '../firebaseConfig'; // Adjust the import path as necessary
import { getDatabase, ref, get } from "firebase/database";

function Read() {
    let [playerArray, setplayerArray] = useState([]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const dataRef = ref(db, 'data/players');
        const snapshot = await get(dataRef); 
        
        try {
            if (snapshot.exists()) {
                const playerfetchArray = Object.values(snapshot.val());

                setplayerArray(Object.values(snapshot.val()));
                console.log("Data fetched successfully:", playerfetchArray);
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

  return (
    <div>
        <button onClick={fetchData}>Fetch Player Data</button>
        <ul>
            {playerArray.map((player, index) => (
                <li key={index}>
                    <strong>Player Name:</strong> {player.playerName} <br />
                    <strong>Player Details:</strong> {player.playerDetails}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Read