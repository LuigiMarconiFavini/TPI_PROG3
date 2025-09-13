import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!fullName.trim()) {
      setErrors((eS) => ({ ...eS, fullName: true }));
      return;
    }
    if (!email.trim()) {
      setErrors((eS) => ({ ...eS, email: true }));
      emailRef.current?.focus();
      return;
    }
    if (password.length < 6) {
      setErrors((eS) => ({ ...eS, password: true }));
      passwordRef.current?.focus();
      return;
    }
    if (password !== confirmPassword) {
      setErrors((eS) => ({ ...eS, confirmPassword: true }));
      confirmPasswordRef.current?.focus();
      return;
    }

    // Si pasa todas
    setErrors({ fullName: false, email: false, password: false, confirmPassword: false });
    // Simulación de registro
    alert("✅ Registro exitoso");
    navigate("/login");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white">
      {/* Lado izquierdo - imagen de cancha azul */}
      <div className="hidden lg:block">
        <img
          src="https://www.elneverazo.com/wp-content/uploads/2022/03/bolahs-1170x658-1.jpg"
          alt="Cancha Azul"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Lado derecho - formulario registro */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="CanchaYa"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Crear cuenta en CanchaYa
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Nombre completo
              </label>
              <input
                id="fullName"
                name="fullName"
                ref={null}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`mt-2 w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm
                  ${errors.fullName ? "border-red-500 ring-2 ring-red-500" : "border-gray-300 focus:ring-blue-600"}`}
                placeholder="Tu nombre completo"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-2 w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm
                  ${errors.email ? "border-red-500 ring-2 ring-red-500" : "border-gray-300 focus:ring-blue-600"}`}
                placeholder="tu@ejemplo.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-2 w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm
                  ${errors.password ? "border-red-500 ring-2 ring-red-500" : "border-gray-300 focus:ring-blue-600"}`}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                ref={confirmPasswordRef}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`mt-2 w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm
                  ${errors.confirmPassword ? "border-red-500 ring-2 ring-red-500" : "border-gray-300 focus:ring-blue-600"}`}
                placeholder="Reingresá la contraseña"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Registrarse
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-600">
            ¿Ya tenés cuenta?{" "}
            <a href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
              Iniciá sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

