import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PessoaView from './PessoaView';
import { searchPessoa, getPessoa } from './PessoaAction';

class PessoaContainer extends PureComponent {
  render() {
    return (
      <PessoaView
        {...this.props}
        onGet={ this.props.getPessoa }
        onSearch={ this.props.searchPessoa } />
    )
  }
}

const mapStateToProps = state => ({
  row: state.Pessoa.row,
  rows: state.Pessoa.rows,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchPessoa,
  getPessoa
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PessoaContainer);