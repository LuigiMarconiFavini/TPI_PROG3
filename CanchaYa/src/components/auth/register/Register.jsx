import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!email.trim()) newErrors.email = "El email es obligatorio";
    if (!password.trim()) newErrors.password = "La contraseña es obligatoria";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Datos enviados:", { nombre, email, password });
      alert("⚠️ Funcionalidad pendiente");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="CanchaYa"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Crear cuenta en CanchaYa
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NOMBRE */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-100"
            >
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={`block w-full rounded-md px-3 py-1.5 text-white bg-white/5 placeholder:text-gray-500 focus:outline-none focus:ring-2 sm:text-sm
                  ${
                    errors.nombre
                      ? "ring-2 ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                placeholder="Tu nombre"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full rounded-md px-3 py-1.5 text-white bg-white/5 placeholder:text-gray-500 focus:outline-none focus:ring-2 sm:text-sm
                  ${
                    errors.email
                      ? "ring-2 ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                placeholder="ejemplo@email.com"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100"
            >
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full rounded-md px-3 py-1.5 text-white bg-white/5 placeholder:text-gray-500 focus:outline-none focus:ring-2 sm:text-sm
                  ${
                    errors.password
                      ? "ring-2 ring-red-500"
                      : "focus:ring-indigo-500"
                  }`}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          ¿Ya tenés cuenta?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
