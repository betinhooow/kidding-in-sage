export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const GET_REQUEST = 'GET_REQUEST';
export const GET_SUCCESS = 'GET_SUCCESS';
export const GET_FAILURE = 'GET_FAILURE';
export const POST_REQUEST = 'POST_REQUEST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAILURE = 'POST_FAILURE';
export const PUT_REQUEST = 'PUT_REQUEST';
export const PUT_SUCCESS = 'PUT_SUCCESS';
export const PUT_FAILURE = 'PUT_FAILURE';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE = 'DELETE_FAILURE';

export function searchPessoa() {
  return dispatch => {
    dispatch({ type: SEARCH_REQUEST });
    return fetch(`https://swapi.co/api/people/`)
      .then(response => response.json())
      .then(resp  => dispatch({ type: SEARCH_SUCCESS, result: resp.results }))
      .catch(errors => dispatch({ type: SEARCH_FAILURE, error: errors }));
  }
}

export function getPessoa(id) {
  return dispatch => {
    dispatch({ type: GET_REQUEST });
    return fetch(`https://swapi.co/api/people/${id}`, {
        credentials: 'same-origin',
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(resp => dispatch({ type: GET_SUCCESS, result: resp.results }))
      .catch(errors => dispatch({ type: GET_FAILURE, error: errors }));
  }
}

export function postPessoa(data) {
  return dispatch => {
    dispatch({ type: POST_REQUEST });
    return fetch(`https://swapi.co/api/people/`, {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(resp => dispatch({ type: POST_SUCCESS, result: resp.results }))
      .catch(errors => dispatch({ type: POST_FAILURE, error: errors }));
  }
}

export function putPessoa(id, data) {
  return dispatch => {
    dispatch({ type: PUT_REQUEST });
    return fetch(`https://swapi.co/api/people/${id}`, {
        credentials: 'same-origin',
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(resp => dispatch({ type: PUT_SUCCESS, result: resp.results }))
      .catch(errors => dispatch({ type: PUT_FAILURE, error: errors }));
  }
}

export function deletePessoa(id){
  return dispatch => {
    dispatch({ type: DELETE_REQUEST });
    return fetch(`https://swapi.co/api/people/${id}`, {
        credentials: 'same-origin',
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(resp => dispatch({ type: DELETE_SUCCESS, result: resp }))
      .catch(errors => dispatch({ type: DELETE_FAILURE, error: errors }));
  }
}