import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LocacoesTable from './locacoesTable'
import LocacaoService from '../../app/service/locacaoService'
import LocalStorageService from '../../app/service/localstorageService'

import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';



class ConsultaLocacoes extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        filme: '',
        showConfirmDialog: false,
        locacaoDeletar: {},
        locacoes : []
    }

    constructor(){
        super();
        this.service = new LocacaoService();
    }

    buscar = () => {
        if(!this.state.ano){
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório.')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const locacaoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            filme: this.state.filme,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(locacaoFiltro)
            .then( resposta => {
                const lista = resposta.data;
                
                if(lista.length < 1){
                    messages.mensagemAlert("Nenhum resultado encontrado.");
                }
                this.setState({ locacoes: lista })
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-locacoes/${id}`)
    }

    abrirConfirmacao = (locacao) => {
        this.setState({ showConfirmDialog : true, locacaoDeletar: locacao  })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, locacaoDeletar: {}  })
    }

    deletar = () => {
        this.service
            .deletar(this.state.locacaoDeletar.id)
            .then(response => {
                const locacoes = this.state.locacoes;
                const index = locacoes.indexOf(this.state.locacaoDeletar)
                locacoes.splice(index, 1);
                this.setState( { locacoes: locacoes, showConfirmDialog: false } )
                messages.mensagemSucesso('Locação deletada com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar a Locação')
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-locacoes')
    }

    alterarStatus = (locacao, status) => {
        this.service
            .alterarStatus(locacao.id, status)
            .then( response => {
                const locacoes = this.state.locacoes;
                const index = locacoes.indexOf(locacao);
                if(index !== -1){
                    locacao['status'] = status;
                    locacoes[index] = locacao
                    this.setState({locacao});
                }
                messages.mensagemSucesso("Status atualizado com sucesso!")
            })
    }

    render(){
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} 
                        className="p-button-secondary" />
            </div>
        );

        return (
            <Card title="Consulta Locações">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" 
                                       className="form-control" 
                                       id="inputAno" 
                                       value={this.state.ano}
                                       onChange={e => this.setState({ano: e.target.value})}
                                       placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes" 
                                            value={this.state.mes}
                                            onChange={e => this.setState({ mes: e.target.value })}
                                            className="form-control" 
                                            lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" label="Filme: ">
                                <input type="text" 
                                       className="form-control" 
                                       id="inputDesc" 
                                       value={this.state.filme}
                                       onChange={e => this.setState({filme: e.target.value})}
                                       placeholder="Digite o filme" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Locação: ">
                                <SelectMenu id="inputTipo" 
                                            value={this.state.tipo}
                                            onChange={e => this.setState({ tipo: e.target.value })}
                                            className="form-control" 
                                            lista={tipos} />
                            </FormGroup>

                            <button onClick={this.buscar} 
                                    type="button" 
                                    className="btn btn-success">
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <button onClick={this.preparaFormularioCadastro} 
                                    type="button" 
                                    className="btn btn-danger">
                                    <i className="pi pi-plus"></i> Cadastrar
                            </button>

                        </div>
                        
                    </div>
                </div>   
                <br/ >
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LocacoesTable locacoes={this.state.locacoes} 
                                              deleteAction={this.abrirConfirmacao}
                                              editAction={this.editar}
                                              alterarStatus={this.alterarStatus} />
                        </div>
                    </div>  
                </div> 
                <div>
                    <Dialog header="Confirmação" 
                            visible={this.state.showConfirmDialog} 
                            style={{width: '50vw'}}
                            footer={confirmDialogFooter} 
                            modal={true} 
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        Confirma a exclusão dessa Locação?
                    </Dialog>
                </div>           
            </Card>

        )
    }
}

export default withRouter(ConsultaLocacoes);