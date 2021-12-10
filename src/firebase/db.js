import { collection, addDoc } from "firebase/firestore";

import { db } from "./firebaseConfig";

export const addUserDoc = async (email) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      email: email,
    });
    console.log("docunent written with id:", docRef.id);
  } catch (error) {
    console.error("error", error);
  }
};

// const getUsers = async () => {

//   const data = await getDocs(usersCollectionRef);

//   setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
// };
// getUsers();
