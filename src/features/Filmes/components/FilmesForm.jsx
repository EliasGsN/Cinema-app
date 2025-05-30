import { useState } from "react";
import { Button } from "../../../components/buttons/Button";
import { SelectInput } from "../../../components/Input/SelectInput";

export function FilmeForm({
  titulo = "",
  genero = "",
  classificacao = "",
  duracao = "",
  estreia = "",
  descricao = "",
  onSubmit,
  editando = false,
  onCancelarEdicao,
}) {
  const [formData, setFormData] = useState({
    titulo,
    genero: "",
    classificacao: "",
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
        <SelectInput
          id="genero"
          label="Gênero"
          value={formData.genero}
          onChange={handleChange}
          options={[
            { value: "Livre", label: "Livre" },
            { value: "10", label: "10 anos" },
            { value: "12", label: "12 anos" },
            { value: "14", label: "14 anos" },
            { value: "16", label: "16 anos" },
            { value: "18", label: "18 anos" },
          ]}
        />
        {validated && !formData.genero && (
          <div className="invalid-feedback">Selecione um gênero.</div>
        )}
      </div>

      <div className="col-md-4">
        <SelectInput
          id="classificacao"
          label="Classificação"
          value={formData.classificacao}
          onChange={handleChange}
          options={[
            { value: "Ação", label: "Ação" },
            { value: "Animação", label: "Animação" },
            { value: "Aventura", label: "Aventura" },
            { value: "Comédia", label: "Comédia" },
            { value: "Drama", label: "Drama" },
            { value: "Romance", label: "Romance" },
            { value: "Suspense", label: "Suspense" },
            { value: "Terror", label: "Terror" },
          ]}
        />
        {validated && !formData.classificacao && (
          <div className="invalid-feedback">Selecione uma classificação.</div>
        )}
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

      <div className="col-12 d-flex gap-2">
        <Button
          text="Salvar"
          variant="primary"
          size="btn-sm"
          type="submit"
          loading={false}
        />
        {editando && (
          <Button
            text="Cancelar Edição"
            variant="secondary"
            size="btn-sm"
            type="button"
            onClick={onCancelarEdicao}
          />
        )}
      </div>
    </form>
  );
}
