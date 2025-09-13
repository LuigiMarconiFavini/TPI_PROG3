import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrors({ ...errors, email: true });
      emailRef.current.focus();
      return;
    }

    if (!password.trim() || password.length < 6) {
      setErrors({ ...errors, password: true });
      passwordRef.current.focus();
      return;
    }

    setErrors({ email: false, password: false });
    onLogin();
    navigate("/");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white">
      {/* Lado izquierdo - con la imagen */}
      <div className="hidden lg:block">
        <img
          src="https://realidadgeselinaonline.com.ar/wp-content/uploads/2025/06/MINIBLOGS-6.png"
          alt="Fútbol / Padel"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Lado derecho - formulario */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="CanchaYa"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Iniciar sesión en CanchaYa
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm
                    ${errors.email ? "border-red-500 ring-2 ring-red-500" : "border-gray-300 focus:ring-indigo-500"}`}
                  placeholder="tu@ejemplo.com"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm
                    ${errors.password ? "border-red-500 ring-2 ring-red-500" : "border-gray-300 focus:ring-indigo-500"}`}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-600">
            ¿No tenés cuenta?{" "}
            <a href="/register" className="font-semibold text-green-600 hover:text-green-500">
              Registrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


