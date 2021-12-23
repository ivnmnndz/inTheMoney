import React, { useContext, useEffect, useState } from "react";
import "../css/Profile.css";
import { AuthContext } from "../context/AuthState";
import { getMyTrades } from "../firebase/db";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [myTrades, setMyTrades] = useState([]);

  /* useEffect(
    () =>
      onSnapshot(collection(db, "trades"), (snapshot) =>
        setMyTrades(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  ); */

  useEffect(() => {
    async function fetchTrades() {
      if (currentUser) {
        const trades = await getMyTrades(currentUser.uid);
        setMyTrades(trades);
      } else {
        console.log("no user");
      }
    }
    fetchTrades();
  }, []);
  console.log(myTrades);

  return currentUser ? (
    <div className="container">
      <div className="user-data">
        <div>
          <span>Name:</span>
          <h3>{currentUser.displayName}</h3>
          <span>Email: </span>
          <div>{currentUser.email}</div>
          <button>Edit Profile</button>
        </div>

        <button>Make a trade</button>
      </div>

      <div className="user-stats">
        <h2>My Trades</h2>
        {myTrades.map((trade) => (
          <div key={trade.id}>{trade.asset}</div>
        ))}
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Profile;

//   const [users, setUsers] = useState([])
//   const usersCollectionRef = collection(db,"users")

//   // user exist ? if so, more conditionals based on what data is attached to it
//   // otherwise show loading until we fetch user

// useEffect(() => {
//   const getUsers = async () => {
//     const data = await getDocs(usersCollectionRef)
//     setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
//   }
//   getUsers()
// }, [])

// return (
//   <div>
//     {users.map((users) => {
//         return <div>
//           <h1>Name: {users.name}</h1>
//           <h1>{users.email}</h1>

//         </div>
//     })}
//   </div>
// )
