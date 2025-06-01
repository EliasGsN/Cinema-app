import { useState } from "react";
import { SalasForm } from "../components/SalasForm";
import { SalasTable } from "../components/SalasTable";

export function SalasPage() {
  const [salas, setSalas] = useState(() => {
    const local = localStorage.getItem("salas");
    return local ? JSON.parse(local) : [];
  });
  const [editando, setEditando] = useState(null);

  const handleSubmit = (dados) => {
    if (editando !== null) {
      const novasSalas = salas.map((s, idx) =>
        (s.id || idx + 1) === editando ? { ...s, ...dados, id: editando } : s
      );
      setSalas(novasSalas);
      localStorage.setItem("salas", JSON.stringify(novasSalas));
      setEditando(null);
    } else {
      const novoId = salas.length > 0 ? (salas[salas.length - 1].id || salas.length) + 1 : 1;
      const novaSala = { ...dados, id: novoId };
      const novasSalas = [...salas, novaSala];
      setSalas(novasSalas);
      localStorage.setItem("salas", JSON.stringify(novasSalas));
    }
  };

  const handleEditar = (id) => {
    setEditando(id);
  };

  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir esta sala?")) {
      const novasSalas = salas.filter((s, idx) => (s.id || idx + 1) !== id);
      setSalas(novasSalas);
      localStorage.setItem("salas", JSON.stringify(novasSalas));
      if (editando === id) setEditando(null);
    }
  };

  const salaEditando = editando !== null ? salas.find((s, idx) => (s.id || idx + 1) === editando) : undefined;

  return (
    <>
      <h4>Salas</h4>
      <hr />
      <SalasForm
        {...(salaEditando || {})}
        onSubmit={handleSubmit}
        key={editando || 'nova'}
        editando={!!editando}
        onCancelarEdicao={() => setEditando(null)}
      />
      <br /><h4>Lista de Salas</h4>
      <SalasTable salas={salas} onEditar={handleEditar} onExcluir={handleExcluir} />
    </>
  );
}
