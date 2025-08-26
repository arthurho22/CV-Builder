import { useState } from 'react';

export default function CVForm({ onSubmit }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [experienciaProfissional, setExperienciaProfissional] = useState('');
  const [educacao, setEducacao] = useState('');
  const [habilidades, setHabilidades] = useState('');
  const [objetivosProfissional, setObjetivosProfissional] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      nome, 
      email, 
      telefone, 
      endereco, 
      experienciaProfissional, 
      educacao, 
      habilidades, 
      objetivosProfissional 
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label>Telefone:</label>
        <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      </div>

      <div>
        <label>Endereço:</label>
        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      </div>

      <div>
        <label>Experiência Profissional:</label>
        <input type="text" value={experienciaProfissional} onChange={(e) => setExperienciaProfissional(e.target.value)} />
      </div>

      <div>
        <label>Educação:</label>
        <input type="text" value={educacao} onChange={(e) => setEducacao(e.target.value)} />
      </div>

      <div>
        <label>Habilidades:</label>
        <input type="text" value={habilidades} onChange={(e) => setHabilidades(e.target.value)} />
      </div>

      <div>
        <label>Objetivo Profissional:</label>
        <input type="text" value={objetivosProfissional} onChange={(e) => setObjetivosProfissional(e.target.value)} />
      </div>

      <button type="submit">Salvar CV</button>
    </form>
  );
}
