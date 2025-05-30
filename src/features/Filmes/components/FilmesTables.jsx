import { Button } from '../../../components/buttons/Button';

export function FilmesTables({ filmes = [], onEditar, onExcluir }) {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped table-bordered border-secondary" id="tabela-filmes">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Título</th>
            <th scope="col">Gênero</th>
            <th scope="col">Classificação</th>
            <th scope="col">Duração</th>
            <th scope="col">Data de Estreia</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filmes.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center">Nenhum filme cadastrado.</td>
            </tr>
          ) : (
            filmes.map((filme, idx) => {
              const id = filme.id || idx + 1;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{filme.titulo}</td>
                  <td>{filme.genero}</td>
                  <td>{filme.classificacao}</td>
                  <td>{filme.duracao}</td>
                  <td>{filme.estreia}</td>
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
