import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import CVForm from '../components/form/CVForm';

export default function Home() {
  const [curriculos, setCurriculos] = useLocalStorage('curriculos', []);
  const [cv, setCv] = useState(null);

  const handleSubmit = (formData) => {
    const novoCurriculo = { ...formData, id: Date.now() };
    setCurriculos([...curriculos, novoCurriculo]);
    setCv(novoCurriculo);
  };

  return (
    <div>
      <h1>CV Builder</h1>
      {!cv ? (
        <CVForm onSubmit={handleSubmit} />
      ) : (
        <div>
          <h2>Currículo Criado com Sucesso!</h2>
          <h3>{cv.nome}</h3>
        </div>

      )}
    </div>
  );
}