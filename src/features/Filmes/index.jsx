import { useState } from "react";
import { FilmeForm } from "./components/FilmesForm.jsx";
import { FilmesTables } from "./components/FilmesTables.jsx";

export function Filmes() {
  const [filmes, setFilmes] = useState(() => {
    const local = localStorage.getItem("filmes");
    return local ? JSON.parse(local) : [];
  });
  const [editando, setEditando] = useState(null); 

  const handleSubmit = (dados) => {
    if (editando !== null) {
      const novosFilmes = filmes.map((f, idx) =>
        (f.id || idx + 1) === editando ? { ...f, ...dados, id: editando } : f
      );
      setFilmes(novosFilmes);
      localStorage.setItem("filmes", JSON.stringify(novosFilmes));
      setEditando(null);
    } else {
      const novoId = filmes.length > 0 ? (filmes[filmes.length - 1].id || filmes.length) + 1 : 1;
      const novoFilme = { ...dados, id: novoId };
      const novosFilmes = [...filmes, novoFilme];
      setFilmes(novosFilmes);
      localStorage.setItem("filmes", JSON.stringify(novosFilmes));
    }
  };

  const handleEditar = (id) => {
    setEditando(id);
  };

  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este filme?")) {
      const novosFilmes = filmes.filter((f, idx) => (f.id || idx + 1) !== id);
      setFilmes(novosFilmes);
      localStorage.setItem("filmes", JSON.stringify(novosFilmes));
      if (editando === id) setEditando(null); // cancela edição se o filme editado for excluído
    }
  };

  const filmeEditando = editando !== null ? filmes.find((f, idx) => (f.id || idx + 1) === editando) : undefined;

  return (
    <>
      <h4>Filmes</h4>
      <hr />
      <FilmeForm
        {...(filmeEditando || {})}
        onSubmit={handleSubmit}
        key={editando || 'novo'}
        editando={!!editando}
        onCancelarEdicao={() => setEditando(null)}
      />
      <br /><h4>Lista de Filmes</h4>
      <FilmesTables filmes={filmes} onEditar={handleEditar} onExcluir={handleExcluir} />
    </>
  );
}