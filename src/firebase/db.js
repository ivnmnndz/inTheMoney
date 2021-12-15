import { db } from "./firebaseConfig";
import { getDoc, setDoc, doc } from "firebase/firestore";

export const addUserDoc = async ( documentId, data ) => {
  const docRef = doc( db, "users", documentId );
  try {
    await setDoc( docRef, data );
    console.log( "document written with id: ", documentId );
  } catch (error) {
    console.error( "error", error );
  }
};
export const getUserDoc = async (documentId) => {
  const docRef = doc(db, "users", documentId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.exists() ? docSnap.data() : null
  if (data === null || data === undefined) return null
  return { documentId, ...data }
}

// const getUsers = async () => {

//   const data = await getDocs(usersCollectionRef);

//   setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
// };
// getUsers();
