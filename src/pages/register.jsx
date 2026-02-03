import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registrarUsuario } from "../services/authServices";
import Fondo from "../assets/img/fondo.jpg";


function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            await registrarUsuario(formData.fullName, formData.email, formData.password);
            navigate("/app");
        } catch (error) {
            console.error(error);
            setError("Error al registrar: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 bg-cover bg-center" style={{ backgroundImage: `url(${Fondo})` }}>
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md relative">
                <h2 className="text-2xl font-bold text-center text-[#1FAF97] mb-6">Crear Cuenta en FoodHome</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Nombre Completo */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Ej. María Pérez"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF97]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Correo Electrónico */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF97]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF97]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Confirmar Contraseña */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirmar Contraseña</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FAF97]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#1FAF97] text-white font-bold py-2 px-4 rounded hover:bg-[#178b78] transition duration-300 disabled:bg-gray-400"
                    >
                        Registrate
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes cuenta? <Link to="/login" className="text-[#1FAF97] font-bold hover:underline">Inicia Sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );

}
export default Register;