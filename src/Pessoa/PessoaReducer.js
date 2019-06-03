import {
  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, 
  POST_REQUEST, POST_SUCCESS, POST_FAILURE, 
  PUT_REQUEST, PUT_SUCCESS, PUT_FAILURE, 
  DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE
} from '../Pessoa/PessoaAction';
  
  const initialState = {
    pessoas: [],
  }
  
const Pessoa = (state=initialState, action) => {
    switch (action.type) {

      case SEARCH_REQUEST:
        return { 
          ...initialState, 
          status: 'Requisitando...'
        }
      case SEARCH_SUCCESS:
        return {
          ...initialState,
          pessoas: action.result,
          status: 'Foi um sucesso'
        }
      case SEARCH_FAILURE:
        return {
          ...state,
          status: 'Deu Erro'
        }
  
      /**
        * POST
        */
      case POST_REQUEST:
        return {
          ...initialState,
          status: 'Requisitando...'
        }
      case POST_SUCCESS:
        return {
          ...state,
          status: 'Foi um sucesso'
        }
      case POST_FAILURE:
        return {
          ...state,
          status: 'Deu Erro'
        }
  
      /**
        * PUT
        */
      case PUT_REQUEST:
        return {
          ...state,
          status: 'Requisitando...'
        }
      case PUT_SUCCESS:
        return {
          ...state,
          status: 'Foi um sucesso'
        }
      case PUT_FAILURE:
        return {
          ...state,
          status: 'Deu Erro'
        }
  
      /**
        * DELETE
        */
      case DELETE_REQUEST:
        return {
          ...initialState,
          status: 'Requisitando...'
        }
      case DELETE_SUCCESS:
        return {
          ...initialState,
          status: 'Foi um sucesso'
        }
      case DELETE_FAILURE:
        return {
          ...state,
          status: 'Deu Erro'
        }
  
      // others
      default:
        return state;
    }
  }

  export default Pessoa;