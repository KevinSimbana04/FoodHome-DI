import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function AdminConfig() {
    const [categorias, setCategorias] = useState([])
    const [nuevaCat, setNuevaCat] = useState("")

    // 1. LEER Categorías (Tiempo Real)
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "global_categories"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setCategorias(data);
        });
        return () => unsubscribe()
    }, []);

    // 2. CREAR Categoría Global
    const handleAgregar = async (e) => {
        e.preventDefault();
        if (!nuevaCat.trim()) return;

        try {
            await addDoc(collection(db, "global_categories"), {
                nombre: nuevaCat,
                creadaEn: new Date()
            });
            toast.success("Categoría creada")
            setNuevaCat("");
        } catch (error) {
            toast.error("Error al crear")
        }
    };

    // 3. BORRAR Categoría
    const handleBorrar = async (id) => {
        if (confirm("¿Seguro que deseas eliminar esta categoría global?")) {
            await deleteDoc(doc(db, "global_categories", id))
            toast.info("Categoría eliminada")
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#1FAF97] mb-4">Panel de Administrador</h1>

            <div className="bg-white p-4 rounded shadow mb-6">
                <h2 className="font-bold mb-2">Crear Nueva Categoría Global</h2>
                <form onSubmit={handleAgregar} className="flex gap-2">
                    <input
                        type="text"
                        value={nuevaCat}
                        onChange={(e) => setNuevaCat(e.target.value)}
                        placeholder="Ej. Lácteos, Carnes"
                        className="border p-2 rounded flex-1"
                    />
                    <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Crear
                    </button>
                </form>
            </div>

            <h3 className="font-bold text-gray-700 mb-2">Categorías Existentes ({categorias.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categorias.map(cat => (
                    <div key={cat.id} className="bg-gray-50 p-3 rounded border flex justify-between items-center">
                        <span>{cat.nombre}</span>
                        <button onClick={() => handleBorrar(cat.id)} className="text-red-500 font-bold">X</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminConfig;