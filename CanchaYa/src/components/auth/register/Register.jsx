import { useState, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthenticationContext } from "../../services/auth.context";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();

  const { handleUserLogin } = useContext(AuthenticationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!username.trim()) {
      setErrors((s) => ({ ...s, username: true }));
      usernameRef.current?.focus();
      return;
    }
    if (!email.trim()) {
      setErrors((s) => ({ ...s, email: true }));
      emailRef.current?.focus();
      return;
    }
    if (password.length < 6) {
      setErrors((s) => ({ ...s, password: true }));
      passwordRef.current?.focus();
      return;
    }
    if (password !== confirmPassword) {
      setErrors((s) => ({ ...s, confirmPassword: true }));
      confirmPasswordRef.current?.focus();
      return;
    }

    setErrors({
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Login automático después de registrarse
        handleUserLogin(data.token, data.user);
        navigate("/"); // Redirigir al home
      } else {
        alert(data?.msg || data?.message || "No se pudo realizar el registro");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Error al conectar con el servidor");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-white">
      <div className="hidden lg:block">
        <img
          src="/images/foto-register.jpg"
          alt="Cancha Azul"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Crear cuenta en CanchaYa
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de usuario
              </label>
              <input
                id="username"
                ref={usernameRef}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-2 w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                  errors.username
                    ? "border-red-500 ring-2 ring-red-500"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
                placeholder="Ej: fran123"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-2 w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                  errors.email
                    ? "border-red-500 ring-2 ring-red-500"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
                placeholder="tu@ejemplo.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-2 w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                  errors.password
                    ? "border-red-500 ring-2 ring-red-500"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                ref={confirmPasswordRef}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`mt-2 w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                  errors.confirmPassword
                    ? "border-red-500 ring-2 ring-red-500"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
                placeholder="Reingresá la contraseña"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
              >
                {submitting ? "Registrando..." : "Registrarse"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-600">
            ¿Ya tenés cuenta?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
