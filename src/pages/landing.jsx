
import HeaderLanding from "../components/headerlading";
import Footer from "../components/footer";
import Despensa from "../assets/img/Des.jpg";
import Banner1 from "../assets/img/banner.jpg";
import CasaIcon from "../assets/Iconos/casa.png";
import CrecimientoIcon from "../assets/Iconos/crecimiento-economico.png";
import EvaluacionIcon from "../assets/Iconos/evaluacion.png";
import { Link } from "react-router-dom";

function Landing() {
    return (
        <>
            <div>
                <HeaderLanding />

                {/* Hero Section */}
                <section
                    className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center"
                    style={{ backgroundImage: `url(${Banner1})` }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 z-0"></div>

                    {/* Content */}
                    <div className="relative z-10 text-white px-4">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                            Gestiona tu comida, <br /> ahorra dinero
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md text-gray-100">
                            La mejor forma de planificar tus compras y organizar tu despensa.
                        </p>
                        <Link to="/login">
                            <button className="bg-[#1FAF97] hover:bg-[#178b78] text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-xl">
                                Comenzar
                            </button>
                        </Link>
                    </div>
                </section >

                {/* How it works Section */}
                <section className="py-20 bg-white overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Text Content */}
                            <div className="flex-1 space-y-8 text-center">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">¿Cómo funciona?</h2>
                                    <p className="text-xl text-gray-600 leading-relaxed">
                                        Simplicidad en tres pasos. Toma el control de tu cocina hoy mismo.
                                    </p>
                                </div>

                                <ul className="space-y-6 max-w-2xl mx-auto text-left">
                                    <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#1FAF97]/10 transition-colors">
                                        <span className="flex-shrink-0 w-10 h-10 bg-[#1FAF97] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">1</span>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-800 mb-1">Crea tu cuenta</h4>
                                            <p className="text-gray-600">Regístrate gratis en segundos y configura tu perfil.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#1FAF97]/10 transition-colors">
                                        <span className="flex-shrink-0 w-10 h-10 bg-[#1FAF97] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">2</span>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-800 mb-1">Agrega tus productos</h4>
                                            <p className="text-gray-600">Escanea o ingresa manualmente los alimentos de tu despensa.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#1FAF97]/10 transition-colors">
                                        <span className="flex-shrink-0 w-10 h-10 bg-[#1FAF97] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">3</span>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-800 mb-1">Optimiza y Ahorra</h4>
                                            <p className="text-gray-600">FoodHome te avisará cuando algo vaya a caducar.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Image Content */}
                            <div className="flex-1 flex justify-center md:justify-end items-center pr-20">
                                <img
                                    src={Despensa}
                                    alt="Organización de despensa"
                                    className="w-full h-auto rounded-lg shadow-md max-w-sm"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section (Beneficios) */}
                <section className="py-10 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-[#1FAF97] mb-4 tracking-tight">Beneficios Principales</h2>
                            <div className="w-24 h-1 bg-[#1FAF97] mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Card 1: Inventario */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group border border-gray-100">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
                                    <img src={CasaIcon} alt="Inventario" className="w-20 h-20 object-contain" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Inventario Inteligente</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Sabe exactamente qué tienes en casa sin abrir la alacena.
                                </p>
                            </div>

                            {/* Card 2: Listas de Compras */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group border border-gray-100">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
                                    <img src={EvaluacionIcon} alt="Listas de Compras" className="w-20 h-20 object-contain" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Listas de Compras</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Planifica tu súper y no olvides nada. ¡Adiós a las compras impulsivas!
                                </p>
                            </div>

                            {/* Card 3: Ahorro */}
                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group border border-gray-100">
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
                                    <img src={CrecimientoIcon} alt="Ahorro Real" className="w-20 h-20 object-contain" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Ahorro Real</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Evita el desperdicio de alimentos caducados y cuida tu bolsillo.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
export default Landing