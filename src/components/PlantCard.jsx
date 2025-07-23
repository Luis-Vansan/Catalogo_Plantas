export default function PlantCard({ plant }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
      <img
        src={plant.image}
        alt={plant.name}
        className="w-full h-48 object-cover rounded-t-xl"
        loading="lazy"
      />
      <div className="p-5">
        <h2 className="text-xl font-semibold text-green-900 mb-2 truncate" title={plant.name}>
          {plant.name}
        </h2>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{plant.description}</p>
        <div className="flex flex-wrap gap-2">
          {plant.tags.map((tag, i) => (
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
  );
}
