import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlantCard from "../components/PlantCard";
import { db } from "../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Home() {
  const [plants, setPlants] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const plantsCol = collection(db, "plantas");

    // Escuta em tempo real mudanças na coleção 'plantas'
    const unsubscribe = onSnapshot(plantsCol, (snapshot) => {
      const plantsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPlants(plantsList);
    }, (error) => {
      console.error("Erro ao buscar plantas em tempo real:", error);
    });

    // Cleanup: cancelar a escuta quando componente desmontar
    return () => unsubscribe();
  }, []);

  const showMore = () => setVisibleCount(prev => prev + 9);

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center text-green-900 mb-10">
          Catálogo de Plantas
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {plants.slice(0, visibleCount).map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
        {visibleCount < plants.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={showMore}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
            >
              Mostrar mais
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
