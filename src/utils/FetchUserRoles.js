import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const fetchUserRoutes = async (email) => {
  try {
    const docRef = doc(firestore, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log(userData.routes);
      return userData.routes || [];
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching user roles:", error.message);
    return [];
  }
};

export default fetchUserRoutes;
