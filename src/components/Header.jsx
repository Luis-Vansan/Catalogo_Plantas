import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Nome do site à esquerda */}
        <h1 className="text-2xl font-bold">Catálogo de Plantas</h1>

        {/* Ícone de perfil à direita */}
        <Link to="/login">
          <UserCircle className="w-8 h-8 hover:text-green-300" />
        </Link>
      </div>
    </header>
  );
}
