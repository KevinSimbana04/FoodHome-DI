import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { actualizarPerfil, actualizarPassword } from "../services/authServices";
import { toast } from "react-toastify";
function UserProfile() {

    const [user, setUser] = useState(null);
    const [role, setRole] = useState("Cargando...");
    const [nombre, setNombre] = useState("");
    const [passwords, setPasswords] = useState({ nueva: "", confirmar: "" });

    // Estados de carga separados
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    useEffect(() => {
        // Cargar datos del usuario actual y su Rol desde Firestore
        const fetchUserData = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                setUser(currentUser);
                setNombre(currentUser.displayName || "");

                // Obtener el rol desde Firestore
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setRole(docSnap.data().rol || "user");
                        // Si el nombre en firestore es más reciente, úsalo
                        if (docSnap.data().nombreCompleto) setNombre(docSnap.data().nombreCompleto);
                    }
                } catch (error) {
                    console.error("Error al obtener rol:", error);
                }
            }
        };
        fetchUserData();
    }, []);

    // Manejar actualización de Nombre
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoadingProfile(true);
        try {
            await actualizarPerfil(nombre);
            console.log("Perfil actualizado correctamente");
            alert("Perfil actualizado correctamente");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar perfil");
        }
        setLoadingProfile(false);
    };


    // Manejar cambio de Contraseña
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwords.nueva !== passwords.confirmar) {
            return alert("Las contraseñas no coinciden");
        }
        if (passwords.nueva.length < 6) {
            return toast.error("La contraseña debe tener al menos 6 caracteres");
        }

        setLoadingPassword(true);
        try {
            await actualizarPassword(user, passwords.nueva);
            toast.success("Contraseña actualizada. Vuelve a iniciar sesión.");
            setPasswords({ nueva: "", confirmar: "" });
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/requires-recent-login') {
                toast.error("Por seguridad, cierra sesión y vuelve a entrar para cambiar tu clave.");
            } else {
                toast.error("Error al cambiar contraseña");
            }
        }
        setLoadingPassword(false);
    };

    if (!user) return <div className="p-8 text-center">Cargando perfil...</div>;
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* ENCABEZADO DE PERFIL */}
            <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-6 border border-gray-100">
                <div className="h-20 w-20 rounded-full bg-[#1FAF97]/10 flex items-center justify-center text-3xl">
                    {/* Avatar simple basado en inicial o foto si tuviera */}
                    {user.photoURL ? <img src={user.photoURL} className="rounded-full" /> : "👤"}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{nombre || "Usuario"}</h1>
                    <p className="text-gray-500">{user.email}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                        Rol: {role === 'admin' ? 'Administrador' : 'Usuario'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* FORMULARIO DATOS BÁSICOS */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b">Editar Información</h2>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FAF97] focus:border-transparent outline-none transition"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loadingProfile}
                            className={`w-full text-white font-medium py-2 px-4 rounded-lg transition-colors ${loadingProfile ? 'bg-[#1FAF97]/60' : 'bg-[#1FAF97] hover:bg-[#178b78]'}`}
                        >
                            {loadingProfile ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </form>
                </div>

                {/* FORMULARIO SEGURIDAD */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-700 mb-4 pb-2 border-b">Seguridad</h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                            <input
                                type="password"
                                value={passwords.nueva}
                                onChange={(e) => setPasswords({ ...passwords, nueva: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FAF97] focus:border-transparent outline-none transition"
                                placeholder="Mínimo 6 caracteres"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                            <input
                                type="password"
                                value={passwords.confirmar}
                                onChange={(e) => setPasswords({ ...passwords, confirmar: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FAF97] focus:border-transparent outline-none transition"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loadingPassword}
                            className={`w-full text-white font-medium py-2 px-4 rounded-lg transition-colors ${loadingPassword ? 'bg-gray-600' : 'bg-gray-800 hover:bg-gray-900'}`}
                        >
                            {loadingPassword ? "Actualizando..." : "Actualizar Contraseña"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default UserProfile;