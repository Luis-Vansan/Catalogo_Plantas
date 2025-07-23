import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";



export default function Admin() {

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const [plantas, setPlantas] = useState([]);
  const [novaPlanta, setNovaPlanta] = useState({
    nome: "",
    descricao: "",
    quantidade: 0,
    localizacao: "",
    tags: "",
    imagem: "",
  });
  const [imagemFile, setImagemFile] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const plantasRef = collection(db, "plantas");

  const carregarPlantas = async () => {
    const snapshot = await getDocs(plantasRef);
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPlantas(lista);
  };

  useEffect(() => {
    carregarPlantas();
  }, []);

  // Limpa URL do preview para liberar memória
  useEffect(() => {
    return () => {
      if (imagemFile) URL.revokeObjectURL(imagemFile);
    };
  }, [imagemFile]);

  const uploadImagemParaImgBB = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const resposta = await fetch(
      `https://api.imgbb.com/1/upload?key=871600b70058edb3f1d7994ff5bf0d2a`,
      {
        method: "POST",
        body: formData,
      }
    );

    const dados = await resposta.json();
    setUploading(false);
    return dados.data.url;
  };

  const adicionarOuEditarPlanta = async (e) => {
    e.preventDefault();

    let imagemURL = novaPlanta.imagem;
    if (imagemFile) {
      imagemURL = await uploadImagemParaImgBB(imagemFile);
    }

    const dadosPlanta = {
      ...novaPlanta,
      quantidade: Number(novaPlanta.quantidade),
      tags: novaPlanta.tags.split(",").map((tag) => tag.trim()),
      imagem: imagemURL,
    };

    if (editandoId) {
      await updateDoc(doc(db, "plantas", editandoId), dadosPlanta);
      setEditandoId(null);
    } else {
      await addDoc(plantasRef, dadosPlanta);
    }

    setNovaPlanta({
      nome: "",
      descricao: "",
      quantidade: 0,
      localizacao: "",
      tags: "",
      imagem: "",
    });
    setImagemFile(null);
    carregarPlantas();
  };

  const removerPlanta = async (id) => {
    await deleteDoc(doc(db, "plantas", id));
    carregarPlantas();
  };

  const iniciarEdicao = (planta) => {
    setNovaPlanta({
      nome: planta.nome,
      descricao: planta.descricao,
      quantidade: planta.quantidade,
      localizacao: planta.localizacao,
      tags: planta.tags.join(", "),
      imagem: planta.imagem,
    });
    setImagemFile(null);
    setEditandoId(planta.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link
        to="/"
        className="inline-block mb-4 text-green-700 hover:text-green-900 font-medium underline"
      >
        ← Voltar para Home
      </Link>

      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>

      <form onSubmit={adicionarOuEditarPlanta} className="space-y-4 mb-6">
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
          onChange={(e) =>
            setNovaPlanta({ ...novaPlanta, descricao: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          className="w-full p-2 border"
          value={novaPlanta.quantidade}
          onChange={(e) =>
            setNovaPlanta({ ...novaPlanta, quantidade: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Localização"
          className="w-full p-2 border"
          value={novaPlanta.localizacao}
          onChange={(e) =>
            setNovaPlanta({ ...novaPlanta, localizacao: e.target.value })
          }
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
          type="file"
          accept="image/*"
          className="w-full p-2 border"
          onChange={(e) => setImagemFile(e.target.files[0])}
          // required se não tiver imagem na edição
          required={!novaPlanta.imagem && !imagemFile}
        />

        {/* Preview da imagem */}
        {(imagemFile || novaPlanta.imagem) && (
          <img
            src={imagemFile ? URL.createObjectURL(imagemFile) : novaPlanta.imagem}
            alt="Prévia da planta"
            className="mt-2 w-40 h-28 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {uploading
            ? "Enviando imagem..."
            : editandoId
            ? "Salvar Edição"
            : "Adicionar Planta"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Plantas Cadastradas:</h2>
      <ul className="space-y-3">
        {plantas.map((planta) => (
          <li
            key={planta.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{planta.nome}</h3>
              <img src={planta.imagem} alt={planta.nome} className="h-24 mt-1" />
              <p className="text-sm">{planta.descricao}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => iniciarEdicao(planta)}
                className="text-blue-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => removerPlanta(planta.id)}
                className="text-red-600 hover:underline"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
