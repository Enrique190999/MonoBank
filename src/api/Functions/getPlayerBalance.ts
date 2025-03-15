import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getPlayerBalance = async (name: string): Promise<number | null> => {
    try {
      const playersRef = collection(db, "players");
      const q = query(playersRef, where("id", "==", name));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const playerData = querySnapshot.docs[0].data();
        return playerData.balance;
      } else {
        console.log("Jugador no encontrado");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el balance:", error);
      return null;
    }
  };
  