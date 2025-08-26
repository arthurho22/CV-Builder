import { useState } from 'react';
import CVForm from '../components/CVForm';

export default function Home() {
  const [cv, setCv] = useState(null);

  return (
    <div>
      <h1>CV Builder</h1>
      {!cv ? (
        <CVForm onSubmit={setCv} />
      ) : (
        <div>
          <h2>Seu CV:</h2>
          <p>Nome: {cv.nome}</p>
          <p>Email: {cv.email}</p>
          <p>Telefone: {cv.telefone}</p>
          <p>Endereço: {cv.endereco}</p>
          <p>Experiência Profissional: {cv.experienciaProfissional}</p>
          <p>Educação: {cv.educacao}</p>
          <p>Habilidades: {cv.habilidades}</p>
          <p>Objetivo Profissional: {cv.objetivosProfissional}</p>
          <button onClick={() => setCv(null)}>Editar</button>
        </div>
      )}
    </div>
  );
}
