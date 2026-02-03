import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";


// Registrar usuario y crear perfil en Firestore
export const registrarUsuario = async (fullName, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar datos básicos en Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: email,
            nombreCompleto: fullName,
            rol: 'user', // Rol por defecto
            createdAt: new Date()
        });

        return user;
    } catch (error) {
        throw error;
    }
};

export const loginUsuario = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};


export const logoutUsuario = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};