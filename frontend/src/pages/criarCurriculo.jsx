import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import CVForm from '../components/CVForm';
import Swal from 'sweetalert2';

export default function CriarCurriculo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [curriculos, setCurriculos] = useLocalStorage('curriculos', []);
    
    const isEditMode = !!id;
    
    const curriculoParaEditar = isEditMode 
        ? curriculos.find(c => c.id === parseInt(id)) 
        : null;


        const createCurriculo = async (formData) => {
        return new Promise((resolve) => {
            const novoCurriculo = {
                id: Date.now(), 
                ...formData,
                dataCriacao: new Date().toISOString()
            };
            
            const novosCurriculos = [...curriculos, novoCurriculo];
            setCurriculos(novosCurriculos);
            resolve(novoCurriculo);
        });
    };


    const updateCurriculo = async (id, formData) => {
        return new Promise((resolve) => {
            const novosCurriculos = curriculos.map(curriculo =>
                curriculo.id === parseInt(id)
                    ? { ...curriculo, ...formData, dataAtualizacao: new Date().toISOString() }
                    : curriculo
            );
            
            setCurriculos(novosCurriculos);
            resolve();
        });
    };

    const handleSubmit = async (formData) => {
        try {
            if (isEditMode) {
                await updateCurriculo(id, formData);
                Swal.fire('Sucesso!', 'Currículo atualizado com sucesso!', 'success');
            } else {
                await createCurriculo(formData);
                Swal.fire('Sucesso!', 'Currículo criado com sucesso!', 'success');
            }
            navigate('/visualizar-curriculos');
        } catch (error) {
            console.error('Erro ao salvar:', error);
            Swal.fire('Erro', 'Não foi possível salvar o currículo', 'error');
        }
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