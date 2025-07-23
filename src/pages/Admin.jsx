// /pages/Admin.jsx
import { useEffect, useState } from "react";
import { auth } from "../service/firebase";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
      else setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="p-4">Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel de Administração</h1>
      {/* aqui virão os botões de adicionar e remover plantas */}
    </div>
  );
}
  