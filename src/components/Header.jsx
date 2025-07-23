import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 
import { UserCircle } from "lucide-react";
import logo from "../assets/logo.jpeg";

export default function Header() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef();

  // Fecha o popup ao clicar fora da imagem
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="bg-orange-300 text-green-1000 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(true)}>
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
        <Link to="/" className="text-xl font-bold text-green-900 select-none">VansanGiardino</Link>
      </div>

      <Link to={user ? "/admin" : "/login"} title={user ? "Administração" : "Fazer Login"}>
        <UserCircle size={32} className="hover:text-green-300 transition" />
      </Link>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <img
            ref={popupRef}
            src={logo}
            alt="Logo Ampliada"
            className="max-w-[90vw] max-h-[90vh] rounded-full shadow-lg"
          />
        </div>
      )}
    </header>
  );
}
