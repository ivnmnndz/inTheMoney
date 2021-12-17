import React, { useContext } from "react";
import { AuthContext } from "../context/AuthState";
import "../css/Profile.css";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

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
        <div className="user-stats">
          <h4>STATS</h4>
          <span>wins: 10</span>
          <span>losses: 10</span>
          <span>win %: 50%</span>
          <span>avg trade length: 30 days</span>
        </div>
        <button>Make a trade</button>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Profile;
