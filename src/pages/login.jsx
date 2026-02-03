import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUsuario } from "../services/authServices";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await loginUsuario(formData.email, formData.password);
            navigate("/app");
        } catch (error) {
            console.error(error);
            setError("Error al iniciar sesión: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Iniciar Sesión</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Correo Electrónico */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes cuenta?  <Link to="/register" className="text-green-600 font-bold hover:underline">Registrate</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Login;