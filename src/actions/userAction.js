export const actions = {
  LOGIN: {
    REQUEST: "LOGIN_REQUEST",
    SUCCESS: "LOGIN_SUCCESS",
    FAILED: "LOGIN_FAILED",
  },
};

export function loginRequest() {
  return {
    type: actions.LOGIN.REQUEST,
  };
}

export function loginSuccess(me) {
  return {
    type: actions.LOGIN.SUCCESS,
    payload: {
      me,
    },
  };
}
