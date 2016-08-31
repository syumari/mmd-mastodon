import api from '../api'

export const COMPOSE_CHANGE         = 'COMPOSE_CHANGE';
export const COMPOSE_SUBMIT         = 'COMPOSE_SUBMIT';
export const COMPOSE_SUBMIT_REQUEST = 'COMPOSE_SUBMIT_REQUEST';
export const COMPOSE_SUBMIT_SUCCESS = 'COMPOSE_SUBMIT_SUCCESS';
export const COMPOSE_SUBMIT_FAIL    = 'COMPOSE_SUBMIT_FAIL';

export function changeCompose(text) {
  return {
    type: COMPOSE_CHANGE,
    text: text
  };
}

export function submitCompose() {
  return function (dispatch, getState) {
    dispatch(submitComposeRequest());

    api(getState).post('/api/statuses', {
      status: getState().getIn(['compose', 'text'], ''),
      in_reply_to_id: getState().getIn(['compose', 'in_reply_to_id'], null)
    }).then(function (response) {
      dispatch(submitComposeSuccess(response.data));
    }).catch(function (error) {
      dispatch(submitComposeFail(error));
    });
  };
}

export function submitComposeRequest() {
  return {
    type: COMPOSE_SUBMIT_REQUEST
  };
}

export function submitComposeSuccess(response) {
  return {
    type: COMPOSE_SUBMIT_SUCCESS
  };
}

export function submitComposeFail(error) {
  return {
    type: COMPOSE_SUBMIT_FAIL,
    error: error
  };
}

