export const actions = {
  LOGIN: {
    REQUEST: "LOGIN_REQUEST",
    SUCCESS: "LOGIN_SUCCESS",
    FAILED: "LOGIN_FAILED",
  },
};

export function loginRequest(token) {
  return {
    type: actions.LOGIN.REQUEST,
    payload: {
      token,
    },
  };
}
