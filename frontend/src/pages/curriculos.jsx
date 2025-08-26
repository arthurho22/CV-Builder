import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Curriculos() {
  const [curriculos, setCurriculos] = useLocalStorage('curriculos', []);

  const deleteCurriculo = (id) => {
    setCurriculos(curriculos.filter(cv => cv.id !== id));
  };

  return (
    <div>
      <h1>Meus Currículos</h1>
      {curriculos.map(cv => (
        <div key={cv.id}>
          <h3>{cv.nome}</h3>
          <button>Visualizar</button>
          <button>Editar</button>
          <button onClick={() => deleteCurriculo(cv.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}