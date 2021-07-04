import { USERS, SAVE_USER_ANSWER, SAVE_USER_QUESTION } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case USERS:
      return {
        ...state,
        ...action.users
      };
    case SAVE_USER_ANSWER:
      return {
        ...state,
        [action.user]: {
          ...state[action.user.User],
          answers: {
            ...state[action.user.User].answers,
            [action.user.id]: action.user.answer
          }
        }
      };
    case SAVE_USER_QUESTION:
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          questions: [...state[action.user].questions, action.id]
        }
      };
    default:
      return state;
  }
}
