import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onLogin(); // 🔑 habilita rutas privadas
        navigate("/");
      } else {
        alert(data?.message || "❌ Credenciales inválidas");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("⚠️ Error al conectar con el servidor");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white">
      {/* Imagen */}
      <div className="hidden lg:block">
        <img
          src="https://realidadgeselinaonline.com.ar/wp-content/uploads/2025/06/MINIBLOGS-6.png"
          alt="Fútbol / Padel"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Formulario */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="CanchaYa"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
            Iniciar sesión en CanchaYa
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 sm:mx-auto sm:w-full sm:max-w-md">
          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-2 w-full rounded-md border px-3 py-2 sm:text-sm ${
                errors.email ? "border-red-500 ring-2 ring-red-500" : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="tu@ejemplo.com"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-2 w-full rounded-md border px-3 py-2 sm:text-sm ${
                errors.password ? "border-red-500 ring-2 ring-red-500" : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-600">
          ¿No tenés cuenta?{" "}
          <a href="/register" className="font-semibold text-green-600 hover:text-green-500">
            Registrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
