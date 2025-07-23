import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const docRef = doc(db, "plantas", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPlant(docSnap.data());
        } else {
          console.log("Planta não encontrada");
        }
      } catch (error) {
        console.error("Erro ao buscar planta:", error);
      }
    };

    fetchPlant();
  }, [id]);

  if (!plant) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <img
            src={plant.imagem}
            alt={plant.nome}
            className="w-full h-64 object-cover rounded-t-xl"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/600x300?text=Imagem+Indisponível";
            }}
          />
          <div className="p-8">
            <h1 className="text-4xl font-extrabold mb-4 text-green-900">{plant.nome}</h1>
            <p className="text-gray-700 mb-6">{plant.descricao}</p>
            <p className="font-semibold text-green-800 mb-2">
              Localização: <span className="font-normal">{plant.localizacao}</span>
            </p>
            <p className="font-semibold text-green-800 mb-2">
              Quantidade: <span className="font-normal">{plant.quantidade}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {plant.tags && plant.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
