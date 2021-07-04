import {
  QUESTIONS,
  SAVE_QUESTION,
  SAVE_QUESTION_ANSWER
} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case SAVE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      };
    case SAVE_QUESTION_ANSWER:
      const votes = state[action.User.id][action.User.answer].votes;
      return {
        ...state,
        [action.User.id]: {
          ...state[action.User.id],
          [action.User.answer]: {
            ...state[action.User.id][action.User.answer],
            votes: votes.concat([action.User.User])
          }
        }
      };
    default:
      return state;
  }
}
