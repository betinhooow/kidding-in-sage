import React, { PureComponent } from 'react';
import Form from 'carbon-react/lib/components/form';
import Textbox from 'carbon-react/lib/components/textbox';
import { Row, Column } from 'carbon-react/lib/components/row';

const initialState = {
    pessoa: {
        nome: '',
        cpf: '',
        idade: '',
        sexo: ''
    }
}

export default class Pessoa extends PureComponent {
    state = initialState;

    handleChange = e => this.setState({ ...this.state, pessoa: { ...this.state.pessoa, [e.target.name]: e.target.value} })

    TrataEnvioDoFormulario = e => {
        e.preventDefault();
        console.log("A pessoa criada é", this.state.pessoa)
    }

    limpaFormulario = () => {
        this.setState(initialState);
    }

    render(){
        const { nome, cpf, idade, sexo } = this.state.pessoa;
        return(
            <div style={{paddingLeft: '30px', paddingTop: '30px'}}>
                <Row>
                    <Column>
                        <h1>Cadastro de Pessoas</h1>
                        <Form onSubmit={this.TrataEnvioDoFormulario} onCancel={this.limpaFormulario} saveText="Enviar" cancelText="Limpar">
                            <Textbox name="nome" value={nome} label="Nome" onChange={this.handleChange} />
                            <Textbox name="cpf" value={cpf} label="CPF" onChange={this.handleChange} />
                            <Textbox name="idade" value={idade} label="Idade" onChange={this.handleChange} />
                            <Textbox name="sexo" value={sexo} label="Sexo" onChange={this.handleChange} />
                        </Form>
                    </Column>
                    <Column>
                        <h1>Listagem de Pessoas</h1>
                    </Column>
                </Row>
            </div>
        )
    }
}