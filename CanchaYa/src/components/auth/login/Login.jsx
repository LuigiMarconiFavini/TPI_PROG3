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
      alert("Email vacío");
      emailRef.current.focus();
      return;
    }

    if (!password.trim() || password.length < 6) {
      setErrors({ ...errors, password: true });
      alert("Contraseña incorrecta (mínimo 6 caracteres)");
      passwordRef.current.focus();
      return;
    }

    // Simulación login correcto
    setErrors({ email: false, password: false });
    onLogin();
    navigate("/");
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
          Iniciar sesión en CanchaYa
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
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
                className={`block w-full rounded-md px-3 py-1.5 text-white bg-white/5 placeholder:text-gray-500 focus:outline-none focus:ring-2 sm:text-sm
                  ${errors.email ? "ring-2 ring-red-500" : "focus:ring-indigo-500"}`}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Contraseña
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
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
                className={`block w-full rounded-md px-3 py-1.5 text-white bg-white/5 placeholder:text-gray-500 focus:outline-none focus:ring-2 sm:text-sm
                  ${errors.password ? "ring-2 ring-red-500" : "focus:ring-indigo-500"}`}
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          ¿No tenés cuenta?{" "}
          <a href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Registrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
