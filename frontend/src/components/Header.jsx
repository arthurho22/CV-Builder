import { Link } from 'react-router-dom';
import { FaFileAlt, FaPlus, FaHome } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <FaFileAlt className="mr-2" /> CV Builder
          </Link>
          <nav className="flex space-x-4">
            <Link to="/" className="flex items-center hover:underline">
              <FaHome className="mr-1" /> Início
            </Link>
            <Link to="/criar-curriculo" className="flex items-center hover:underline">
              <FaPlus className="mr-1" /> Criar Currículo
            </Link>
            <Link to="/visualizar-curriculos" className="flex items-center hover:underline">
              <FaFileAlt className="mr-1" /> Ver Currículos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}