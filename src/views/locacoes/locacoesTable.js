import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const rows = props.locacoes.map( locacao => {
        return (
            <tr key={locacao.id}>
                <td>{locacao.filme}</td>
                <td>{ currencyFormatter.format(locacao.valor, { locale: 'pt-BR'}) }</td>
                <td>{locacao.tipo}</td>
                <td>{locacao.mes}</td>
                <td>{locacao.status}</td>
                <td>
                    <button className="btn btn-success" title="Efetivar"
                            disabled={ locacao.status !== 'PENDENTE' }
                            onClick={e => props.alterarStatus(locacao, 'EFETIVADO')} 
                            type="button">
                            <i className="pi pi-check"></i>
                    </button>
                    <button className="btn btn-warning"  title="Cancelar"
                            disabled={ locacao.status !== 'PENDENTE' }
                            onClick={e => props.alterarStatus(locacao, 'CANCELADO')} 
                            type="button">
                            <i className="pi pi-times"></i>
                    </button>
                    <button type="button"   title="Editar"
                            className="btn btn-primary"
                            onClick={e => props.editAction(locacao.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(locacao)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Filme</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

