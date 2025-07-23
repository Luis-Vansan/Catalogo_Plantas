import { Link } from "react-router-dom";

export default function PlantCard({ plant }) {
  return (
    <Link to={`/plant/${plant.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
        {plant.imagem ? (
          <img
            src={plant.imagem}
            alt={plant.nome}
            className="w-full h-48 object-cover rounded-t-xl"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x200?text=Imagem+Indisponível";
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
            Sem imagem disponível
          </div>
        )}

        <div className="p-5">
          <h2 className="text-xl font-semibold text-green-900 mb-2 truncate" title={plant.nome}>
            {plant.nome}
          </h2>
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">{plant.descricao}</p>
          <div className="flex flex-wrap gap-2">
            {plant.tags && plant.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-full select-none"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
