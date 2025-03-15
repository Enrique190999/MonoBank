import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'
import { db } from '../firebase';

export const addPlayer = async (name: string) => {
    try {
        const playerId = uuidv4(); // Genera un ID único
        const docRef = await addDoc(collection(db, "players"), {
            id: playerId,
            name,
            balance: 15000, // Monto inicial típico en Monopoly
        });
        return { id: playerId, docId: docRef.id };
    } catch (error) {
        console.error("Error al añadir jugador:", error);
        return null;
    }
};
