import React, { PureComponent } from 'react';
import { Row, Column } from 'carbon-react/lib/components/row';
import Textbox from 'carbon-react/lib/components/textbox';
import Form from 'carbon-react/lib/components/form';
import DateInput from 'carbon-react/lib/components/date';
import Dropdown from 'carbon-react/lib/components/dropdown';
import Checkbox from 'carbon-react/lib/components/checkbox';
import Button from 'carbon-react/lib/components/button';
import Icon from 'carbon-react/lib/components/icon';
import Confirm from 'carbon-react/lib/components/confirm';
import Dialog from 'carbon-react/lib/components/dialog';
import Immutable from 'carbon-react/lib/utils/helpers/immutable';
import { TableRow, TableHeader, Table, TableCell } from 'carbon-react/lib/components/table';

const initialState = {
    pessoa: {
        nome: '',
        cpf: '',
        cidade_nasc: '',
        data_nasc: (((new Date()).toLocaleDateString()).toString()),
        cor_favorita: '',
        endereco: '',
        sexo: '1',
        feliz: false
    },
    pessoas: [{
        id: 1, nome: 'Roberto Nobre', cpf: '412.312.312-X', cidade_nasc: 'pernambuco', data_nasc: (new Date()).toLocaleDateString(),
        cor_favorita: 'azul', endereco: 'rua aqui, 123', sexo: '1', feliz: true
    }],
    modalView: false,
    modalDelete: false,
    nomeToDelete: '',
    isEdit: false,
    lastId: 1,
    idToEdit: '',
    idToDelete: '',
    isView: false
}

export default class Pessoa extends PureComponent {

    state = initialState

    handleChange = e => {
        this.setState({
            ...this.state,
            pessoa: { ...this.state.pessoa, [e.target.name]: e.target.value }
        })
    }

    handleChangeSexo = e => {
        this.setState({
            ...this.state,
            pessoa: { ...this.state.pessoa, sexo: e.target.value }
        })
    }

    handleChangeDtNasc = e => {
        console.log("Bosta")
    }

    handleChangeFeliz = () => {
        this.setState({
            ...this.state,
            pessoa: { ...this.state.pessoa, feliz: !this.state.pessoa.feliz }
        })
    }

    onClickDelete = (id, nome) => {
        this.setState({
            ...this.state,
            modalDelete: !this.state.modalDelete,
            idToDelete: id,
            nomeToDelete: nome
        })
    }

    onClickEdit = (id) => {
        this.setState({
            ...this.state,
            isEdit: true,
            pessoa: this.state.pessoas.filter(pessoa => pessoa.id === id)[0],
            idToEdit: id
        })
    }

    onCancelIsEdit = () => {
        this.setState({
            isEdit: false,
            pessoa: initialState.pessoa
        })
    }

    onClickView = (id) => {
        this.setState({
            ...this.state,
            modalView: !this.state.modalView,
            pessoa: this.state.pessoas.filter(pessoa => pessoa.id === id)[0],
            isView: true
        })
    }

    onCancelModalView = () => {
        this.setState({
            modalView: !this.state.modalView,
            isView: false,
            pessoa: initialState.pessoa
        })
    }

    deletePerson = () => {
        this.setState({
            ...this.state,
            pessoas: this.state.pessoas.filter(
                pessoa => pessoa.id !== this.state.idToDelete
            ), modalDelete: false
        })
    }

    onSubmitPessoa = (e) => {
        e.preventDefault();
        if (this.state.isEdit === true) {
            this.setState({
                ...this.state,
                pessoas: [
                    ...this.state.pessoas.filter(pessoa => pessoa.id !== this.state.idToEdit),
                    this.state.pessoa
                ], isEdit: false,
                pessoa: initialState.pessoa
            })
        }
        else {
            this.setState({
                pessoas: [
                    ...this.state.pessoas,
                    { id: this.state.lastId + 1, ...this.state.pessoa }
                ],
                pessoa: { ...initialState.pessoa },
                lastId: this.state.lastId + 1
            });
        }
    }

    buildRows() {
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

        this.state.pessoas.forEach(row => {
            rows.push(
                <TableRow key={row.id} uniqueID={`${row.id}`}>
                    <TableCell>{row.nome}</TableCell>
                    <TableCell>{row.cpf}</TableCell>
                    <TableCell align='center'>
                        <Button style={{ borderRadius: '20px', marginRight: '10px' }} onClick={() => this.onClickView(row.id)}> <Icon type="view" /> </Button>
                        <Button style={{ borderRadius: '20px', marginRight: '10px' }} onClick={() => this.onClickEdit(row.id)}> <Icon type="edit" /> </Button>
                        <Button style={{ borderRadius: '20px' }} onClick={() => this.onClickDelete(row.id, row.nome)}> <Icon type="delete" /> </Button>
                    </TableCell>
                </TableRow>
            );
        });
        return rows;
    }

    formPessoa() {
        return <Row columns="2">
            <Column>
                <Textbox label="Nome" name="nome" onChange={this.handleChange} value={this.state.pessoa.nome} disabled={this.state.isView} />
                <Textbox label="CPF" name="cpf" onChange={this.handleChange} value={this.state.pessoa.cpf} disabled={this.state.isView} />
                <Textbox label="Cidade de nascimento" name="cidade_nasc" onChange={this.handleChange} value={this.state.pessoa.cidade_nasc} disabled={this.state.isView} />
                <DateInput label="Data nascimento" name="data_nasc" onChange={this.handleChangeDtNasc} value={this.state.pessoa.data_nasc} disabled={this.state.isView} />
            </Column>
            <Column>
                <Textbox label="Cor favorita" name="cor_favorita" onChange={this.handleChange} value={this.state.pessoa.cor_favorita} disabled={this.state.isView} />
                <Textbox label="Endereço" name="endereco" onChange={this.handleChange} value={this.state.pessoa.endereco} disabled={this.state.isView} />
                <Dropdown name="sexo" options={Immutable.parseJSON([{
                    id: "1", name: "Masculino"
                }, {
                    id: "2", name: "Feminino"
                }])} onChange={this.handleChangeSexo} value={this.state.pessoa.sexo} disabled={this.state.isView} />
                <Checkbox label='Você é feliz?' name='feliz' onChange={this.handleChangeFeliz} value={this.state.pessoa.feliz} checked={this.state.pessoa.feliz} disabled={this.state.isView} />
            </Column>
        </Row>
    }

    render() {
        console.log((((new Date()).toLocaleDateString()).toString()))
        return (
            <div style={{ paddingLeft: '20px', paddingTop: '15px' }}>
                <Row columns="2">
                    <Column>
                        <h1>Cadastro de pessoas</h1>
                        <Form buttonAlign="left" cancelText="Limpar" saveText="Salvar" onSubmit={this.onSubmitPessoa} onCancel={this.onCancelIsEdit} style={{ borderRightColor: '#191717', borderRight: '2px solid', paddingRight: '20px' }}>
                            {this.formPessoa()}
                        </Form>
                    </Column>
                    <Column>
                        <div style={{ paddingLeft: '10px', paddingRight: '20px' }}>
                            <h1>Listagem de pessoas</h1>
                            <Table shrink={true} >
                                {this.buildRows()}
                            </Table>
                        </div>
                    </Column>
                </Row>

                <Confirm onConfirm={this.deletePerson} onCancel={() => this.onClickDelete('', '')} title="Confirmação" open={this.state.modalDelete} >
                    Realmente quer excluir {this.state.idToDelete} - {this.state.nomeToDelete}
                </Confirm>
                <Dialog title="Visualizando pessoa" open={this.state.modalView} onCancel={this.onCancelModalView}>
                    <div>
                        {this.formPessoa()}
                    </div>
                </Dialog>
            </div>
        )
    }
}
