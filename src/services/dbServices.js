import { db } from "../firebase/firebase";
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";


// Agregar item a una subcolección
export const agregarItem = async (uid, subColeccion, data) => {
    try {
        const subColeccionRef = collection(db, "users", uid, subColeccion);
        await addDoc(subColeccionRef,
            {
                ...data,
                createdAt: new Date()
            });

    } catch (error) {
        console.error("Error al agregar item:", error);
        throw error;
    }
};

// Eliminar item de una subcolección
export const eliminarItem = async (uid, subcoleccion, idDoc) => {
    const docRef = doc(db, "users", uid, subcoleccion, idDoc);
    await deleteDoc(docRef);
};

// Actualizar item
export const actualizarItem = async (uid, subcoleccion, idDoc, data) => {
    const docRef = doc(db, "users", uid, subcoleccion, idDoc);
    await updateDoc(docRef, data);
};

// Escuchar items en tiempo real
export const escucharItems = (uid, subcoleccion, callback) => {
    const q = query(collection(db, "users", uid, subcoleccion), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(items);
    });
};

// Escuchar Categorías Globales
export const escucharCategorias = (callback) => {
    const q = query(collection(db, "global_categories"), orderBy("nombre"));
    return onSnapshot(q, (snapshot) => {
        const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(cats);
    });
};