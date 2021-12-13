import { collection, addDoc, setDoc, doc } from "firebase/firestore";

import { db } from "./firebaseConfig";

export const addUserDoc = async (email, documentId) => {
  try {
   await setDoc(
      doc(db, "users", documentId, {
        email: email,
      })
    );

    console.log("docunent written with id:",documentId);
  } catch (error) {
    console.error("error", error);
  }
};

// const getUsers = async () => {

//   const data = await getDocs(usersCollectionRef);

//   setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
// };
// getUsers();
