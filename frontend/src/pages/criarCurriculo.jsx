import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CVForm from "../components/CVForm";
import { criarCurriculo } from "../services/curriculoService";

export default function CriarCurriculo() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData) => {
        setLoading(true);
        try {
            await criarCurriculo(formData);
            navigate('/visualizar-curriculos');
        } catch (error) {
            console.error('Erro ao criar currículo:', error);
            alert('Erro ao salvar currículo');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Criar Currículo</h1>
                        <p className="text-gray-600">Preencha as informações para criar seu currículo</p>
                    </div>

                    <CVForm onSubmit={handleSubmit} />

                    {loading && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg">Salvando...</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}