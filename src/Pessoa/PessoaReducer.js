import {
  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, 
  GET_REQUEST, GET_SUCCESS, GET_FAILURE, 
  POST_REQUEST, POST_SUCCESS, POST_FAILURE, 
  PUT_REQUEST, PUT_SUCCESS, PUT_FAILURE, 
  DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE
} from '../Pessoa/PessoaAction';
  
  const initialState = {
    row: {},
    rows: [],
    pageable: {
      activePage: 0,
      itemsCountPerPage: 10,
      totalItemsCount: 0,
      pageRangeDisplayed: 0,
    },
    failures: [],
    messages: [],
    loading: false,
  }
  
const Pessoa = (state=initialState, action) => {
    switch (action.type) {
      /**
        * SEARCH
        */
      case SEARCH_REQUEST:
        return { ...initialState, loading: true }
      case SEARCH_SUCCESS:
        return {
          ...initialState,
          rows: action.result,
          loading: false,
        }
      case SEARCH_FAILURE:
        return {
          ...state,
          failures: action.errors,
          loading: false
        }
  
      /**
        * GET
        */
      case GET_REQUEST:
        return { ...initialState, loading: true }
      case GET_SUCCESS:
        return {
          ...initialState,
          row: action.data.results,
          messages: action.data.messages,
          loading: false,
        }
      case GET_FAILURE:
        return {
          ...state,
          failures: action.errors,
          loading: false
        }
  
      /**
        * POST
        */
      case POST_REQUEST:
        return {
          ...initialState,
          loading: true
        }
      case POST_SUCCESS:
        return {
          ...state,
          messages: action.data.messages,
          loading: false,
        }
      case POST_FAILURE:
        return {
          ...state,
          failures: action.errors,
          loading: false
        }
  
      /**
        * PUT
        */
      case PUT_REQUEST:
        return {
          ...state,
          messages: initialState.messages,
          failures: initialState.failures,
          loading: true
        }
      case PUT_SUCCESS:
        return {
          ...state,
          row: action.data.data,
          messages: action.data.messages,
          loading: false,
        }
      case PUT_FAILURE:
        return {
          ...state,
          failures: action.errors,
          loading: false
        }
  
      /**
        * DELETE
        */
      case DELETE_REQUEST:
        return {
          ...initialState,
          messages: initialState.messages,
          failures: initialState.failures,
          loading: true
        }
      case DELETE_SUCCESS:
        return {
          ...initialState,
          row: action.data.data,
          messages: ["Deletado com sucesso!"],
          loading: false,
        }
      case DELETE_FAILURE:
        return {
          ...state,
          failures: action.errors,
          loading: false
        }
  
      // others
      default:
        return state;
    }
  }

  export default Pessoa;