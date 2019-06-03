import React, { PureComponent } from 'react';
import Form from 'carbon-react/lib/components/form';
import Textbox from 'carbon-react/lib/components/textbox';
import Button from 'carbon-react/lib/components/button';
import Icon from 'carbon-react/lib/components/icon';
import { Row, Column } from 'carbon-react/lib/components/row';
import Confirm from 'carbon-react/lib/components/confirm';
import { TableRow, TableHeader, Table, TableCell } from 'carbon-react/lib/components/table';

const initialState = {
    pessoa: {
        nome: '',
        cpf: '',
        cidade: '',
        sexo: ''
    },
    pessoas: [ ],
    modalDelete: false
}

export default class Pessoa extends PureComponent {
    state = initialState;

    componentDidMount = () => {
      this.props.searchPessoa().then(() => 
        this.setState({ ...this.state, pessoas: this.props.pessoas }))
    }

    handleChange = e => this.setState({ 
        ...this.state, 
        pessoa: { 
            ...this.state.pessoa, 
            [e.target.name]: e.target.value
        } 
    })

    TrataEnvioDoFormulario = e => {
        e.preventDefault();
        if(this.state.pessoa.id){ //ta editando ou inserindo?
            this.props.onPut(this.state.pessoa).then((pessoa) => {
                this.setState({ 
                    ...this.state, 
                    pessoa: initialState.pessoa,
                    pessoas: [ ...this.state.pessoas, pessoa.result ]
                });
            })
        }else{
            this.props.onPost(this.state.pessoa).then((pessoa) => {
                this.setState({ 
                    ...this.state, 
                    pessoa: initialState.pessoa,
                    pessoas: [ ...this.state.pessoas, pessoa.result ]
                });
            })
        }
    }

    limpaFormulario = () => {
        this.setState({ 
            ...this.state,
            pessoa: initialState.pessoa 
        });
    }

    buildRows = () => {
        let rows = [
            <TableRow key='header' as='header'>
                <TableHeader align='center'>
                    Nome
                </TableHeader>
                <TableHeader align='center'>
                    CPF
                </TableHeader>
                <TableHeader align='center'>
                    #
                </TableHeader>
            </TableRow>
        ];

        this.state.pessoas.forEach((row, index) => {
            rows.push(
                <TableRow key={index} uniqueID={`${index}`}>
                    <TableCell>{row.nome}</TableCell>
                    <TableCell>{row.cpf}</TableCell>
                    <TableCell align='center'>
                        <Button style={{ borderRadius: '20px', marginRight: '10px' }} 
                            onClick={() => this.onClickEdit(row.id)}> 
                                <Icon type="edit" /> 
                        </Button>
                        <Button style={{ borderRadius: '20px' }} 
                            onClick={() => this.onClickDelete(row.id, row.nome)}> 
                            <Icon type="delete" /> 
                        </Button>
                    </TableCell>
                </TableRow>
            );
        });
        return rows;
    }
  
    onClickDelete = (id, nome) => {
        this.setState({
            ...this.state,
            modalDelete: !this.state.modalDelete,
            idToDelete: id,
            nomeToDelete: nome
        })
    }

    confirmaExclusao = () => {
        this.props.onDelete(this.state.idToDelete).then(() => {
            this.setState({
                ...this.state,
                pessoas: this.state.pessoas.filter(pessoa => this.state.idToDelete !== pessoa.id),
                modalDelete: false
            })
        })
    }

    onClickEdit = (id) => {
        this.setState({
            ...this.state,
            pessoa: this.state.pessoas.filter(pessoa => pessoa.id === id)[0],
            pessoas: this.state.pessoas.filter(pessoa => pessoa.id !== id)
        })
    }

    render(){
        console.log(this.props)
        const { nome, cpf, cidade, sexo } = this.state.pessoa;
        return(
            <div style={{paddingLeft: '30px', paddingTop: '30px'}}>
                <Row>
                    <Column>
                        <h1>Cadastro de Pessoas</h1>
                        <Form onSubmit={this.TrataEnvioDoFormulario} onCancel={this.limpaFormulario} saveText="Enviar" cancelText="Limpar">
                            <Row columns="2">
                                <Column>
                                    <Textbox name="nome" value={nome} label="Nome" onChange={this.handleChange} />
                                    <Textbox name="cpf" value={cpf} label="CPF" onChange={this.handleChange} />
                                </Column>
                                <Column>
                                    <Textbox name="cidade" value={cidade} label="Cidade" onChange={this.handleChange} />
                                    <Textbox name="sexo" value={sexo} label="Sexo" onChange={this.handleChange} />
                                </Column>
                            </Row>
                        </Form>
                    </Column>
                    <Column>
                        <h1>Pessoas cadastradas</h1>
                        <Table shrink={true}>
                            { this.buildRows() }
                        </Table>
                    </Column>
                </Row>
                
                <Confirm onConfirm={this.confirmaExclusao} onCancel={() => this.onClickDelete('')} title="Confirmação" open={this.state.modalDelete} >
                    Realmente quer excluir <b>a {this.state.nomeToDelete}</b>
                </Confirm>
            </div>
        )
    }
}