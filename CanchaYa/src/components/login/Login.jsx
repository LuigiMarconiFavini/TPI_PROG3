import React from 'react'

const Login = () => {
    const handleSumbit = (e) => {
        e.preventDDefault();
        const usuario = e.target.usuario.value;
        const password = e.target.password.value;
        alert("Usuario: " + usuario + "\nContraseña: " + password);
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSumbit}>
                <div>
                    <label>Usuario: </label>
                    <input type="texto" name="usuario" />
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input type="password" name="passwor" />
                </div>
                <button type="sumbit">Ingresar</button>
            </form>
        </div>
)
}

export default Login
