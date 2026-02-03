import { useState, useEffect } from "react";
import { agregarItem, eliminarItem, actualizarItem, escucharItems, escucharCategorias } from "../services/dbServices";
import { auth } from "../firebase/firebase";
import despensaIcon from "../assets/Iconos/alimentos-saludables.png";
import trashIcon from "../assets/Iconos/simbolo-de-bote-de-basura-negro.png";
import { toast } from "react-toastify";

function Despensa() {

    const [items, setItems] = useState([]);
    const [nuevoProducto, setNewProducto] = useState({ nombre: "", cantidad: 1, categoria: "General" });
    const [cargando, setCargando] = useState(true);
    const [categorias, setCategorias] = useState([]);

    // Obtenre usuario actual
    const user = auth.currentUser;

    // 1. Cargar Categorías Globales
    useEffect(() => {
        const unsubscribe = escucharCategorias((cats) => {
            setCategorias(cats);
        });
        return () => unsubscribe();
    }, []);

    // 2. Cargar Items de Despensa
    useEffect(() => {
        if (!user) return;

        const descubrir = escucharItems(user.uid, "despensa", (datos) => {
            setItems(datos);
            setCargando(false);
        });

        return () => descubrir();
    }, [user]);

    const handleAgregar = async (e) => {
        e.preventDefault();
        if (!nuevoProducto.nombre.trim())
            return toast.error("El nombre del producto es requerido");

        else if (nuevoProducto.cantidad <= 0 || nuevoProducto.cantidad === "0")
            return toast.error("La cantidad debe ser mayor a 0");

        try {
            await agregarItem(user.uid, "despensa", nuevoProducto);

            setNewProducto({ nombre: "", cantidad: 1, categoria: "General" });
        } catch (error) {
            toast.error("Error al Guardar:", error);
        }
    };


    const handleEliminar = async (id) => {
        if (confirm("¿Estas seguro de eliminar este producto?")) {
            await eliminarItem(user.uid, "despensa", id);
            toast.info("Producto eliminado correctamente");
        }
    };

    const handleActualizar = async (id, cantidadActual, operacion) => {
        const nuevaCantidad = operacion === "+" ? cantidadActual + 1 : cantidadActual - 1;
        if (nuevaCantidad < 0) return toast.error("La cantidad no puede ser negativa");
        await actualizarItem(user.uid, "despensa", id, { cantidad: nuevaCantidad });
    };

    if (!user) return <p className="p-4">Inicia sesión para ver tu despensa.</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#1FAF97] mb-6 flex items-center gap-2">
                Mi Despensa
                <img src={despensaIcon} alt="Despensa" className="w-6 h-6 object-contain" />
            </h1>

            {/* FORMULARIO DE AGREGAR */}
            <form onSubmit={handleAgregar} className="bg-white p-4 rounded-lg shadow-md mb-8 flex gap-2 flex-wrap">
                <input
                    type="text"
                    placeholder="Producto (ej. Leche)"
                    className="border p-2 rounded flex-1"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNewProducto({ ...nuevoProducto, nombre: e.target.value })}
                />
                <select
                    className="border p-2 rounded"
                    value={nuevoProducto.categoria}
                    onChange={(e) => setNewProducto({ ...nuevoProducto, categoria: e.target.value })}
                >
                    <option value="General">General</option>
                    {categorias.map(cat => (
                        <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                    ))}
                </select>
                <input
                    type="number"
                    className="border p-2 rounded w-20"
                    value={nuevoProducto.cantidad}
                    onChange={(e) => setNewProducto({ ...nuevoProducto, cantidad: parseInt(e.target.value) })}
                />
                <button type="submit" className="bg-[#1FAF97] text-white px-6 py-2 rounded hover:bg-[#178b78] transition">
                    Agregar
                </button>
            </form>

            {/* LISTA DE ITEMS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-[#1FAF97] flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">{item.nombre}</h3>
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">{item.categoria}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center border rounded">
                                <button onClick={() => handleActualizar(item.id, item.cantidad, '-')} className="px-2 bg-gray-100 hover:bg-gray-200">-</button>
                                <span className="px-3 font-mono">{item.cantidad}</span>
                                <button onClick={() => handleActualizar(item.id, item.cantidad, '+')} className="px-2 bg-gray-100 hover:bg-gray-200">+</button>
                            </div>

                            <button
                                onClick={() => handleEliminar(item.id)}
                                className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                            >
                                <img src={trashIcon} alt="Eliminar" className="w-5 h-5 object-contain" />
                            </button>
                        </div>
                    </div>
                ))}

                {items.length === 0 && !cargando && (
                    <p className="text-gray-500 col-span-full text-center">Tu despensa está vacía. ¡Agrega algo!</p>
                )}
            </div>
        </div>
    );
}
export default Despensa;