import { Button } from "../../../components/buttons/Button";

export function SessaoTables({ sessoes, onEditar, onExcluir }) {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped table-bordered border-secondary" id="tabela-sessoes">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Filme</th>
            <th scope="col">Sala</th>
            <th scope="col">Horário</th>
            <th scope="col">Preço</th>
            <th scope="col">Idioma</th>
            <th scope="col">Formato</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {sessoes.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center">Nenhuma sessão cadastrada.</td>
            </tr>
          ) : (
            sessoes.map((sessao, idx) => {
              const id = sessao.id || idx + 1;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{sessao.filme}</td>
                  <td>{sessao.sala}</td>
                  <td>{sessao.horario}</td>
                  <td>{sessao.preco}</td>
                  <td>{sessao.idioma}</td>
                  <td>{sessao.formato}</td>
                  <td>
                    <Button text=" Editar" variant="warning" size="sm" icon="pencil" onClick={() => onEditar && onEditar(id)} />
                  </td>
                  <td>
                    <Button text=" Excluir" variant="danger" size="sm" icon="trash" onClick={() => onExcluir && onExcluir(id)} />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
