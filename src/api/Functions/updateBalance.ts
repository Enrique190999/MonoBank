import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updatePlayerBalance = async (playerId: string, newBalance: number) => {
    try {
        // Referencia a la colección 'players'
        const playersRef = collection(db, "players");

        // Consulta para encontrar el documento con el id correcto dentro de los datos
        const q = query(playersRef, where("id", "==", playerId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Suponemos que el ID es único, así que tomamos el primer documento encontrado
            const playerDoc = querySnapshot.docs[0].ref;
            
            // Actualizar el campo balance
            await updateDoc(playerDoc, { balance: newBalance });

            console.log("Balance actualizado correctamente.");
        } else {
            console.error("No se encontró un jugador con ese ID.");
        }
    } catch (error) {
        console.error("Error al actualizar el balance:", error);
    }
};
