// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

export default function Admin() {
  const [plantas, setPlantas] = useState([]);
  const [novaPlanta, setNovaPlanta] = useState({
    nome: "",
    descricao: "",
    quantidade: 0,
    localizacao: "",
    tags: "",
    imagem: "",
  });

  const plantasRef = collection(db, "plantas");

  // Buscar plantas do Firestore
  const carregarPlantas = async () => {
    const snapshot = await getDocs(plantasRef);
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setPlantas(lista);
  };

  useEffect(() => {
    carregarPlantas();
  }, []);

  // Adicionar planta
  const adicionarPlanta = async (e) => {
    e.preventDefault();
    const nova = {
      ...novaPlanta,
      quantidade: Number(novaPlanta.quantidade),
      tags: novaPlanta.tags.split(",").map((tag) => tag.trim())
    };
    await addDoc(plantasRef, nova);
    setNovaPlanta({ nome: "", descricao: "", quantidade: 0, localizacao: "", tags: "", imagem: "" });
    carregarPlantas();
  };

  // Remover planta
  const removerPlanta = async (id) => {
    await deleteDoc(doc(db, "plantas", id));
    carregarPlantas();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>

      {/* Formulário */}
      <form onSubmit={adicionarPlanta} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 border"
          value={novaPlanta.nome}
          onChange={(e) => setNovaPlanta({ ...novaPlanta, nome: e.target.value })}
          required
        />
        <textarea
          placeholder="Descrição"
          className="w-full p-2 border"
          value={novaPlanta.descricao}
          onChange={(e) => setNovaPlanta({ ...novaPlanta, descricao: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          className="w-full p-2 border"
          value={novaPlanta.quantidade}
          onChange={(e) => setNovaPlanta({ ...novaPlanta, quantidade: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Localização"
          className="w-full p-2 border"
          value={novaPlanta.localizacao}
          onChange={(e) => setNovaPlanta({ ...novaPlanta, localizacao: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tags (separadas por vírgula)"
          className="w-full p-2 border"
          value={novaPlanta.tags}
          onChange={(e) => setNovaPlanta({ ...novaPlanta, tags: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="URL da imagem"
          className="w-full p-2 border"
          value={novaPlanta.imagem}
          onChange={(e) => setNovaPlanta({ ...novaPlanta, imagem: e.target.value })}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Adicionar Planta
        </button>
      </form>

      {/* Lista de plantas */}
      <h2 className="text-xl font-semibold mb-2">Plantas Cadastradas:</h2>
      <ul className="space-y-3">
        {plantas.map((planta) => (
          <li key={planta.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{planta.nome}</h3>
              <p className="text-sm">{planta.descricao}</p>
            </div>
            <button
              onClick={() => removerPlanta(planta.id)}
              className="text-red-600 hover:underline"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
