import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PlantDetails() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    // Substituir pelo fetch real do Firebase ou outra API
    // Aqui simula dados para a planta específica
    const fetchPlant = () => {
      const fakePlant = {
        id,
        name: `Planta ${id}`,
        description: `Descrição detalhada da Planta ${id}. Aqui você pode mostrar todos os cuidados, curiosidades e mais.`,
        image: "/assets/exemplo.jpg",
        location: "Quintal",
        quantity: 5,
        tags: ["Sol", "Externa"],
      };
      setPlant(fakePlant);
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
            src={plant.image}
            alt={plant.name}
            className="w-full h-64 object-cover rounded-t-xl"
            loading="lazy"
          />
          <div className="p-8">
            <h1 className="text-4xl font-extrabold mb-4 text-green-900">{plant.name}</h1>
            <p className="text-gray-700 mb-6">{plant.description}</p>
            <p className="font-semibold text-green-800 mb-2">
              Localização: <span className="font-normal">{plant.location}</span>
            </p>
            <p className="font-semibold text-green-800 mb-2">
              Quantidade: <span className="font-normal">{plant.quantity}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {plant.tags.map((tag, i) => (
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
