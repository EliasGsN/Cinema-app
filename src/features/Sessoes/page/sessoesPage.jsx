import { useState } from "react";
import { SessaoForm } from "../components/SessaoForm";
import { SessaoTables } from "../components/SessaoTables";

export function SessoesPage() {
  const [sessoes, setSessoes] = useState(() => {
    const local = localStorage.getItem("sessoes");
    return local ? JSON.parse(local) : [];
  });
  const [editando, setEditando] = useState(null);

  const handleSubmit = (dados) => {
    if (editando !== null) {
      const novasSessoes = sessoes.map((s, idx) =>
        (s.id || idx + 1) === editando ? { ...s, ...dados, id: editando } : s
      );
      setSessoes(novasSessoes);
      localStorage.setItem("sessoes", JSON.stringify(novasSessoes));
      setEditando(null);
    } else {
      const novoId = sessoes.length > 0 ? (sessoes[sessoes.length - 1].id || sessoes.length) + 1 : 1;
      const novaSessao = { ...dados, id: novoId };
      const novasSessoes = [...sessoes, novaSessao];
      setSessoes(novasSessoes);
      localStorage.setItem("sessoes", JSON.stringify(novasSessoes));
    }
  };

  const handleEditar = (id) => {
    setEditando(id);
  };

  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir esta sessão?")) {
      const novasSessoes = sessoes.filter((s, idx) => (s.id || idx + 1) !== id);
      setSessoes(novasSessoes);
      localStorage.setItem("sessoes", JSON.stringify(novasSessoes));
      if (editando === id) setEditando(null);
    }
  };

  const sessaoEditando = editando !== null ? sessoes.find((s, idx) => (s.id || idx + 1) === editando) : undefined;

  return (
    <>
      <h4>Sessões</h4>
      <hr />
      <SessaoForm
        {...(sessaoEditando || {})}
        onSubmit={handleSubmit}
        key={editando || 'nova'}
        editando={!!editando}
        onCancelarEdicao={() => setEditando(null)}
      />
      <br /><h4>Lista de Sessões</h4>
      <SessaoTables sessoes={sessoes} onEditar={handleEditar} onExcluir={handleExcluir} />
    </>
  );
}
