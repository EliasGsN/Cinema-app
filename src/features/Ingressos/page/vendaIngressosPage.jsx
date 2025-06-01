import React, { useEffect, useState } from 'react';
import { LabelInput } from '../../../components/Input/LabelInput';
import { SelectInput } from '../../../components/Input/SelectInput';
import { Button } from '../../../components/Buttons/Button';
import { useLocation } from 'react-router-dom';

export function IngressosPage() {
  const [sessoes, setSessoes] = useState([]);
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    assento: '',
    sessao: '',
    pagamento: '',
  });
  const location = useLocation();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const sessoesStorage = JSON.parse(localStorage.getItem('sessoes') || '[]');
    setSessoes(sessoesStorage);
    const params = new URLSearchParams(location.search);
    const vendaSessao = params.get('vendaSessao');
    if (vendaSessao && sessoesStorage.some(s => String(s.id) === String(vendaSessao))) {
      setForm(f => ({ ...f, sessao: vendaSessao }));
    }
  }, [location.search]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nome || !form.cpf || !form.assento || !form.sessao || !form.pagamento) {
      setValidated(true);
      return;
    }
    const ingressos = JSON.parse(localStorage.getItem('ingressos') || '[]');
    const novaVenda = {
      ...form,
      id: Date.now(),
      sessao: sessoes.find(s => String(s.id) === String(form.sessao)),
    };
    ingressos.push(novaVenda);
    localStorage.setItem('ingressos', JSON.stringify(ingressos));
    alert('Venda realizada com sucesso!');
    setForm({ nome: '', cpf: '', assento: '', sessao: '', pagamento: '' });
    setValidated(false);
  }

  return (
    <>
        <h4>Ingressos</h4>
        <hr />
      <form className={`row g-3 needs-validation ${validated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
        <div className="row mb-2">
          <div className="col-12 col-sm-6">
            <LabelInput
              id="nome"
              label="Nome do Cliente"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-sm-6">
            <SelectInput
              id="sessao"
              label="Sessão"
              value={form.sessao}
              onChange={handleChange}
              required
              options={sessoes.map(sessao => ({
                value: sessao.id,
                label: `${sessao.filme} - Sala ${sessao.sala} - ${sessao.horario} - R$ ${Number(sessao.preco).toFixed(2)}`
              }))}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <LabelInput
              id="cpf"
              label="CPF"
              type="number"
              value={form.cpf}
              onChange={handleChange}
              placeholder="Insira apenas números"
              required
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <LabelInput
              id="assento"
              label="Assento"
              value={form.assento}
              onChange={handleChange}
              placeholder="Ex: A1"
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <SelectInput
              id="pagamento"
              label="Forma de pagamento"
              value={form.pagamento}
              onChange={handleChange}
              required
              options={[
                { value: 'Débito', label: 'Cartão de Débito' },
                { value: 'Crédito', label: 'Cartão de Crédito' },
                { value: 'PIX', label: 'PIX' },
                { value: 'Dinheiro', label: 'Dinheiro' },
              ]}
            />
          </div>
        </div>
        <div className="col-auto">
          <Button text="Confirmar Venda" variant="success" type="submit" />
        </div>
      </form>
    </>
  );
}
