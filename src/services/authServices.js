import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updatePassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";


// Registrar usuario y crear perfil en Firestore
export const registrarUsuario = async (fullName, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const rolAsignado = email === "admin@foodhome.com" ? "admin" : "user";

        // Guardar datos en Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: email,
            nombreCompleto: fullName,
            rol: rolAsignado,
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


export const actualizarPerfil = async (nombreCompleto) => {
    try {
        const user = auth.currentUser;
        if (user) {
            await updateProfile(user, {
                displayName: nombreCompleto
            });

            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                nombreCompleto: nombreCompleto
            }, { merge: true });
        }
    } catch (error) {
        throw error;
    }
};

export const actualizarPassword = async (user, newPassword) => {
    try {
        await updatePassword(user, newPassword);
        return true;
    } catch (error) {
        throw error;
    }
};