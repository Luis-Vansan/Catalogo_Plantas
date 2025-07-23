import { Link } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/login">
          <UserCircle className="w-8 h-8 hover:text-green-300" />
        </Link>
        <h1 className="text-2xl font-bold">Catálogo de Plantas</h1>
      </div>
    </header>
  );
}
