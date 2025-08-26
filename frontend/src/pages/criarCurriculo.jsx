import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import CVForm from '../components/form/CVForm';

export default function CriarCurriculo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [curriculos, setCurriculos] = useLocalStorage('curriculos', []);
    
    const isEditMode = !!id;
    
    const curriculoParaEditar = isEditMode 
        ? curriculos.find(c => c.id === parseInt(id)) 
        : null;

    const handleSubmit = (formData) => {
        if (isEditMode) {
            const updated = curriculos.map(c => 
                c.id === parseInt(id) ? { ...formData, id: parseInt(id) } : c
            );
            setCurriculos(updated);
        } else {
            const novoCurriculo = { ...formData, id: Date.now() };
            setCurriculos([...curriculos, novoCurriculo]);
        }
        
        navigate('/visualizar-curriculos');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {isEditMode ? 'Editar Currículo' : 'Criar Currículo'}
                        </h1>
                    </div>

                    <CVForm 
                        onSubmit={handleSubmit} 
                        initialData={curriculoParaEditar || {}}
                    />
                </div>
            </div>
        </div>
    );
}