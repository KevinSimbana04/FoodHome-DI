import { useState, useEffect } from "react";
import { agregarItem, eliminarItem, actualizarItem, escucharItems } from "../services/dbServices";
import { auth } from "../firebase/firebase";
import comprasIcon from "../assets/Iconos/carrito-de-compras.png";
import trashIcon from "../assets/Iconos/simbolo-de-bote-de-basura-negro.png";
import { toast } from "react-toastify";


function Compras() {

    const [items, setItems] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [nuevoProducto, setNewProducto] = useState({ nombre: "", categoria: "General", cantidad: 1 });
    const user = auth.currentUser;

    useEffect(() => {
        if (!user) {
            setCargando(false);
            return;
        }

        const unsubscribe = escucharItems(user.uid, "compras", (lista) => {
            setItems(lista);
            setCargando(false);
        });

        return () => unsubscribe();
    }, [user]);

    const handleAgregar = async (e) => {
        e.preventDefault();
        if (!nuevoProducto.nombre.trim())
            return toast.error("El nombre del producto es requerido");

        await agregarItem(user.uid, "compras", nuevoProducto);
        setNewProducto({ nombre: "", categoria: "General", cantidad: 1 });
        toast.success("Producto agregado a la lista de compras correctamente");

    };

    const handleEliminar = async (id) => {
        if (confirm("¿Estas seguro de eliminar este producto?")) {
            await eliminarItem(user.uid, "compras", id);
            toast.info("Producto de la lista de compras eliminado correctamente");
        }
    };

    const cambiarCantidad = async (id, cantidadActual, operacion) => {
        const nuevaCantidad = operacion === "+" ? cantidadActual + 1 : cantidadActual - 1;
        if (nuevaCantidad < 0) return toast.error("La cantidad no puede ser negativa");
        await actualizarItem(user.uid, "compras", id, { cantidad: nuevaCantidad });
    };

    const toggleComprado = async (item) => {
        await actualizarItem(user.uid, "compras", item.id, {
            comprado: !item.comprado
        });
    };

    if (!user) return <p className="p-4">Inicia sesión para ver tu lista de compras.</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#1FAF97] mb-6 flex items-center gap-2">
                Lista de Compras
                <img src={comprasIcon} alt="Compras" className="w-6 h-6 object-contain" />
            </h1>

            {/* FORMULARIO */}
            <form onSubmit={handleAgregar} className="bg-white p-4 rounded-lg shadow-md mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="¿Qué necesitas comprar?"
                    className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-[#1FAF97]"
                    value={nuevoProducto.nombre}
                    onChange={(e) => setNewProducto({ ...nuevoProducto, nombre: e.target.value })}
                />
                <button type="submit" className="bg-[#1FAF97] text-white px-6 py-2 rounded hover:bg-[#178b78] transition font-medium">
                    +
                </button>
            </form>

            {/* LISTA */}
            <div className="space-y-3">
                {items.map(item => (
                    <div key={item.id} className={`flex items-center p-4 rounded-lg shadow-sm border transition-all ${item.comprado ? 'bg-[#1FAF97]/10 border-[#1FAF97]/30' : 'bg-white border-gray-100'}`}>

                        <input
                            type="checkbox"
                            checked={item.comprado || false}
                            onChange={() => toggleComprado(item)}
                            className="w-5 h-5 text-[#1FAF97] rounded mr-4 cursor-pointer accent-[#1FAF97]"
                        />

                        <div className="flex-1">
                            <span className={`text-lg block ${item.comprado ? 'line-through text-[#1FAF97] opacity-60' : 'text-gray-800'}`}>
                                {item.nombre}
                            </span>
                            {item.cantidad > 1 && <span className="text-xs text-gray-500 font-bold">Cant: {item.cantidad}</span>}
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-gray-100 rounded mr-2">
                                <button onClick={() => cambiarCantidad(item.id, item.cantidad, '-')} className="px-2 py-1 hover:bg-gray-200 text-gray-600 font-bold">-</button>
                                <button onClick={() => cambiarCantidad(item.id, item.cantidad, '+')} className="px-2 py-1 hover:bg-gray-200 text-gray-600 font-bold">+</button>
                            </div>

                            <button
                                onClick={() => handleEliminar(item.id)}
                                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                            >
                                <img src={trashIcon} alt="Eliminar" className="w-5 h-5 object-contain" />
                            </button>
                        </div>
                    </div>
                ))}

                {items.length === 0 && !cargando && (
                    <div className="text-center py-10 text-gray-400">
                        <p>No tienes nada en tu lista.</p>
                        <p className="text-sm">¡Agrega cosas para no olvidarlas!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Compras;