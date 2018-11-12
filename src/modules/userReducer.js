import { actions } from "actions/userAction";
const initialState = {
  me: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN.SUCCESS: {
      const { me } = action.payload;
      return {
        ...state,
        me,
      };
    }
    default:
      return state;
  }
};

export default reducer;
