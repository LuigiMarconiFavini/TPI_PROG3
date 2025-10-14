import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  useEffect(() => {
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    const orb = document.querySelector(".orb");
    const handleMouseMove = (e) => {
      if (orb) {
        orb.style.left = `${e.clientX}px`;
        orb.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl animate-float1"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl animate-float2"></div>
        <div className="absolute bottom-10 left-1/2 w-48 h-48 bg-cyan-500 rounded-full filter blur-3xl animate-float3"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
          <div className="group">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition duration-500">
                <span className="text-xl font-bold">YA</span>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                CanchaYa
              </h2>
            </div>
            <p className="text-gray-300 mb-6">
              Servicios de alquileres de canchas de futbol y padel.
            </p>
          </div>

          <div className="group">
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              <span className="relative z-10">Atajos</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/my-profile"
                  className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                  Mi Perfil
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                  Mis Reservas
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition duration-300"></span>
                  Contactanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contactanos</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8..."></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-300">Email</p>
                  <a
                    href="mailto:manueljosedala@hotmail.com"
                    className="text-white hover:text-blue-400 transition"
                  >
                    canchaya.soporte@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1..."></path>
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-300">Telefono</p>
                  <a
                    href="tel:+244941540352"
                    className="text-white hover:text-blue-400 transition"
                  >
                    +54 9 341-2324242
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Redes Sociales</h3>

            <form className="mt-4">
              <div className="relative">
                {/* <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-white"
                /> */}
                {/* <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-1 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button> */}
              </div>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; <span id="year" className="text-blue-400"></span> CanchaYa.
            Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Politica de privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Terminos y condiciones
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Cookies
            </a>
          </div>
        </div>
      </div>

      <div className="orb absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 filter blur-3xl pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
