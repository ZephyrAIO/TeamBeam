import axios from 'axios';
import history from "../history"
import { FETCH_USER, SIGN_IN_LOCAL, SIGN_UP_LOCAL } from './types';


export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: response.data })
}

export const signInLocal = formValue => async dispatch => {
  try {
    const response = await axios.post('/auth/login', formValue)
    dispatch({ type: SIGN_IN_LOCAL, payload: response.data })
    history.push('/')
  } catch (e) {
    console.log("Error:", e)
    return e.response.status
  }
}

export const signUpLocal = formValues => async dispatch => {
  try {
    const response = await axios.post('/auth/register', formValues)
    dispatch({ type: SIGN_UP_LOCAL, payload: response.data })
    history.push('/')
  } catch (e) {
    console.log("Error:", e)
    return e.response.status
  }
}