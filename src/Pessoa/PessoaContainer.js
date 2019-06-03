import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PessoaView from './PessoaView';
import { searchPessoa, deletePessoa, putPessoa, postPessoa } from './PessoaAction';

class PessoaContainer extends PureComponent {
  render() {
    return (
      <PessoaView
        {...this.props}
        onSearch={ this.props.searchPessoa }
        onDelete={ this.props.deletePessoa }
        onPut={ this.props.putPessoa }
        onPost={ this.props.postPessoa } />
    )
  }
}

const mapStateToProps = state => ({
  pessoa: state.Pessoa.pessoa,
  pessoas: state.Pessoa.pessoas,
  status: state.Pessoa.status
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchPessoa,
  deletePessoa,
  putPessoa,
  postPessoa
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PessoaContainer);