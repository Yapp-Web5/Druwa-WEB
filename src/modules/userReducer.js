import { actions } from "actions/userAction";
const initialState = {
  room: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN.REQUEST: {
      console.log("TesT");
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
