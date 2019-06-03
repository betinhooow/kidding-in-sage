export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
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
    return fetch(`http://5cf5504cca57690014ab3d76.mockapi.io/api/v1/pessoa`, {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(resp  => dispatch({ type: SEARCH_SUCCESS, result: resp }))
      .catch(errors => dispatch({ type: SEARCH_FAILURE, error: errors }));
  }
}

export function postPessoa(data) {
  return dispatch => {
    dispatch({ type: POST_REQUEST });
    return fetch(`http://5cf5504cca57690014ab3d76.mockapi.io/api/v1/pessoa/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(resp => dispatch({ type: POST_SUCCESS, result: resp }))
      .catch(errors => dispatch({ type: POST_FAILURE, error: errors }));
  }
}

export function putPessoa(data) {
  return dispatch => {
    dispatch({ type: PUT_REQUEST });
    return fetch(`http://5cf5504cca57690014ab3d76.mockapi.io/api/v1/pessoa/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(resp => dispatch({ type: PUT_SUCCESS, result: resp }))
      .catch(errors => dispatch({ type: PUT_FAILURE, error: errors }));
  }
}

export function deletePessoa(id){
  return dispatch => {
    dispatch({ type: DELETE_REQUEST });
    return fetch(`http://5cf5504cca57690014ab3d76.mockapi.io/api/v1/pessoa/${id}`, {
        method: 'DELETE',
      })
      .then(resp => dispatch({ type: DELETE_SUCCESS, result: resp }))
      .catch(errors => dispatch({ type: DELETE_FAILURE, error: errors }));
  }
}