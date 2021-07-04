export const USERS = 'USERS';
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION';
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER';

export function Users(users) {
  return {
    type: USERS,
    users
  };
}

export function saveUserQuestion(user, id) {
  return {
    type: SAVE_USER_QUESTION,
    user,
    id
  };
}

export function saveUserAnswer(user, id, answer) {
  return {
    type: SAVE_USER_ANSWER,
    user,
    id,
    answer
  };
}
