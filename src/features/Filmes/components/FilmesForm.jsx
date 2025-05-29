import { useState } from "react";
import { Button } from "../../../components/buttons/Button";

export function FilmeForm({
  titulo = "",
  genero = "",
  classificacao = "",
  duracao = "",
  estreia = "",
  descricao = "",
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    titulo,
    genero,
    classificacao,
    duracao,
    estreia,
    descricao,
    termos: false, // checkbox adicional
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity()) {
      onSubmit?.(formData); // chama callback se existir
    }

    setValidated(true);
  };

  return (
    <form
      className={`row g-3 needs-validation ${validated ? "was-validated" : ""}`}
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="col-md-6">
        <label htmlFor="titulo" className="form-label">Título do Filme</label>
        <input
          type="text"
          className="form-control"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">Campo obrigatório.</div>
      </div>

      <div className="col-md-6">
        <label htmlFor="genero" className="form-label">Gênero</label>
        <input
          type="text"
          className="form-control"
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">Campo obrigatório.</div>
      </div>

      <div className="col-md-4">
        <label htmlFor="classificacao" className="form-label">Classificação</label>
        <input
          type="text"
          className="form-control"
          id="classificacao"
          name="classificacao"
          value={formData.classificacao}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">Campo obrigatório.</div>
      </div>

      <div className="col-md-4">
        <label htmlFor="duracao" className="form-label">Duração (minutos)</label>
        <input
          type="number"
          className="form-control"
          id="duracao"
          name="duracao"
          value={formData.duracao}
          onChange={handleChange}
          required
          min="1"
        />
        <div className="invalid-feedback">Informe a duração do filme.</div>
      </div>

      <div className="col-md-4">
        <label htmlFor="estreia" className="form-label">Data de Estreia</label>
        <input
          type="date"
          className="form-control"
          id="estreia"
          name="estreia"
          value={formData.estreia}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">Informe a data de estreia.</div>
      </div>

      <div className="col-12">
        <label htmlFor="descricao" className="form-label">Descrição</label>
        <textarea
          className="form-control"
          id="descricao"
          name="descricao"
          rows="4"
          value={formData.descricao}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">Escreva uma descrição.</div>
      </div>

      <div className="col-12">
        <Button
          text="Salvar"
          variant="primary"
          size="btn-sm"
          type="submit"
          loading={false}
        />
      </div>
    </form>
  );
}
