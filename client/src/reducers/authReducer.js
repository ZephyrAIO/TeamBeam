import { FETCH_USER, SIGN_IN_LOCAL, SIGN_UP_LOCAL } from '../actions/types';

const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;

    case SIGN_IN_LOCAL:
      return action.payload;

    case SIGN_UP_LOCAL:
      return action.payload;



    default:
      return state;
  }
}

export default authReducer