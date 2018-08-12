/*
* Author: @nayunhwan (github.com/nayunhwan)
* Email: nayunhwan.dev@gmail.com
*/

import * as DefaultAPI from "../api/_DefaultAPI";

const DefaultAction = {
  START_TO_DEFAULT_ACTION: "START_TO_DEFAULT_ACTION",
  FAILED_TO_DEFAULT_ACTION: "FAILED_TO_DEFAULT_ACTION",
  SUCCEED_TO_DEFAULT_ACTION: "SUCCEED_TO_DEFAULT_ACTION",
};

export function action() {
  return async dispatch => {
    try {
      dispatch({
        type: DefaultAction.START_TO_DEFAULT_ACTION,
      });
      const data = await DefaultAPI.getTest();
      dispatch({
        type: DefaultAction.SUCCEED_TO_DEFAULT_ACTION,
        payload: {
          data,
        },
      });
    } catch (err) {
      dispatch({
        type: DefaultAction.FAILED_TO_DEFAULT_ACTION,
      });
    }
  };
}
