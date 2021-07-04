import { SET_USER } from '../actions/UserAction';

export default function User(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.id;
    default:
      return state;
  }
}
