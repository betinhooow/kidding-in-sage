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
        name: '',
        height: '',
        mass: '',
        hair_color: ''
    },
    pessoas: [ ],
    modalDelete: false
}

export default class Pessoa extends PureComponent {
    state = initialState;

    componentDidMount = () => {
      this.props.searchPessoa()
      .then(resp => this.setState({ ...this.state, pessoas: resp.result }))
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
        this.setState({
            ...this.state,
            pessoas: [
                ...this.state.pessoas,
                this.state.pessoa
            ],
            pessoa: initialState.pessoa
        })
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
                    Peso
                </TableHeader>
                <TableHeader align='center'>
                    #
                </TableHeader>
            </TableRow>
        ];

        this.state.pessoas.forEach((row, index) => {
            rows.push(
                <TableRow key={index} uniqueID={`${index}`}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.height}</TableCell>
                    <TableCell align='center'>
                        <Button style={{ borderRadius: '20px', marginRight: '10px' }} 
                            onClick={() => this.onClickEdit(row.name)}> 
                                <Icon type="edit" /> 
                        </Button>
                        <Button style={{ borderRadius: '20px' }} 
                            onClick={() => this.onClickDelete(row.name)}> 
                            <Icon type="delete" /> 
                        </Button>
                    </TableCell>
                </TableRow>
            );
        });
        return rows;
    }
  
    onClickDelete = (name) => {
        this.setState({
            ...this.state,
            modalDelete: !this.state.modalDelete,
            nameToDelete: name
        })
    }

    confirmaExclusao = () => {
        this.setState({
            ...this.state,
            pessoas: this.state.pessoas.filter(
                pessoa => pessoa.name !== this.state.nameToDelete
            ), modalDelete: false
        })
    }

    onClickEdit = (name) => {
        this.setState({
            ...this.state,
            pessoa: this.state.pessoas.filter(pessoa => pessoa.name === name)[0],
            pessoas: this.state.pessoas.filter(pessoa => pessoa.name !== name)
        })
    }

    render(){
        const { name, height, mass, hair_color } = this.state.pessoa;
        return(
            <div style={{paddingLeft: '30px', paddingTop: '30px'}}>
                <Row>
                    <Column>
                        <h1>Cadastro de Personagens</h1>
                        <Form onSubmit={this.TrataEnvioDoFormulario} onCancel={this.limpaFormulario} saveText="Enviar" cancelText="Limpar">
                            <Row columns="2">
                                <Column>
                                    <Textbox name="name" value={name} label="Nome" onChange={this.handleChange} />
                                    <Textbox name="height" value={height} label="Altura" onChange={this.handleChange} />
                                </Column>
                                <Column>
                                    <Textbox name="mass" value={mass} label="Peso" onChange={this.handleChange} />
                                    <Textbox name="hair_color" value={hair_color} label="Cor do cabelo" onChange={this.handleChange} />
                                </Column>
                            </Row>
                        </Form>
                    </Column>
                    <Column>
                        <h1>Personagens Stars Wars</h1>
                        <Table shrink={true}>
                            { this.buildRows() }
                        </Table>
                    </Column>
                </Row>
                
                <Confirm onConfirm={this.confirmaExclusao} onCancel={() => this.onClickDelete('')} title="Confirmação" open={this.state.modalDelete} >
                    Realmente quer excluir <b>{this.state.nameToDelete}</b>
                </Confirm>
            </div>
        )
    }
}