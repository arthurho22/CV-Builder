import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function VisualizarCurriculos() {
    const [curriculos] = useLocalStorage('curriculos', []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Meus Currículos</h1>
            {curriculos.map((cv) => (
                <div key={cv.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <h2 className="text-xl font-semibold">{cv.nome}</h2>
                    <p>{cv.email}</p>
                    <div className="mt-2">
                        <Link
                            to={`/curriculo/${cv.id}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Visualizar
                        </Link>

                        <Link
                            to={`/editar-curriculo/${cv.id}`}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Editar
                        </Link>

                        <button className="bg-red-500 text-white px-4 py-2 rounded">
                            Excluir
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}