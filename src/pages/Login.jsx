// /pages/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../service/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/admin");
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-green-700 text-center">Login Admin</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800">Entrar</button>
      </form>
    </div>
  );
}
