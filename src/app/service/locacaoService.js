import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

export default class LocacaoService extends ApiService {

    constructor(){
        super('/api/locacoes')
    }

    obterListaMeses(){
        return  [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 },
        ]
    }

    obterListaTipos(){
        return  [
            { label: 'Selecione...', value: '' },
            { label: 'Devolução' , value : 'DEVOLUÇÃO' },
            { label: 'Aluguel' , value : 'ALUGUEL' }
        ]

    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, { status })
    }

    validar(locacao){
        const erros = [];

        if(!locacao.ano){
            erros.push("Informe o Ano.")
        }

        if(!locacao.mes){
            erros.push("Informe o Mês.")
        }

        if(!locacao.filme){
            erros.push("Informe o Filme.")
        }

        if(!locacao.valor){
            erros.push("Informe o Valor.")
        }

        if(!locacao.tipo){
            erros.push("Informe o Tipo.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    salvar(locacao){
        return this.post('/', locacao);
    }

    atualizar(locacao){
        return this.put(`/${locacao.id}`, locacao);
    }

    consultar(locacaoFiltro){
        let params = `?ano=${locacaoFiltro.ano}`

        if(locacaoFiltro.mes){
            params = `${params}&mes=${locacaoFiltro.mes}`
        }

        if(locacaoFiltro.tipo){
            params = `${params}&tipo=${locacaoFiltro.tipo}`
        }

        if(locacaoFiltro.status){
            params = `${params}&status=${locacaoFiltro.status}`
        }

        if(locacaoFiltro.usuario){
            params = `${params}&usuario=${locacaoFiltro.usuario}`
        }

        if(locacaoFiltro.filme){
            params = `${params}&filme=${locacaoFiltro.filme}`
        }

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
}