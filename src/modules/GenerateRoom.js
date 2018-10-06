import * as generateRoomAPI from "../api/generateRoomAPI";

const DefaultAction = {
  START_COMMUNICATION: "START_COMMUNICATION",
  FAILED_GET_COMMUNICATION: "FAILED_GET_COMMUNICATION",
  SUCCEED_GET_ROOM: "SUCCEED_GET_ROOM",
};

//모듈 초기 상태 정의
const initialState = {
  status: "INIT",
  room: {
    file: "",
    title: "",
    writer: "",
    password: "",
    date: "",
    url: "",
  },
};

/**
 * @author AnGwangHo
 * @returns arrays[]
 * @throws error:404
 * @param {roomId} roomId
 * 방 정보 가져오는 함수
 */
export function getRoom(roomId) {
  return async dispatch => {
    try {
      //요청 시작
      dispatch({ type: DefaultAction.START_COMMUNICATION });

      const data = await generateRoomAPI.get_room(roomId);
      dispatch({
        type: DefaultAction.SUCCEED_GET_ROOM,
        payload: {
          data,
        },
      });
    } catch (error) {
      dispatch({
        type: DefaultAction.FAILED_GET_COMMUNICATION,
        payload: error,
      });
    }
  };
}

//리듀서 방출
/** 추후 status 응답코드 숫자로 변경 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DefaultAction.START_COMMUNICATION:
      return { ...state, status: "START_COMMUNICATION" };
    case DefaultAction.FAILED_GET_COMMUNICATION:
      return { ...state, status: "FAILED_GET_COMMUNICATION" };
    case DefaultAction.SUCCEED_GET_ROOM:
      const { room } = action.payload.data;
      return {
        ...state,
        status: "SUCCEED_GET_ROOM",
        room: { room },
      };
    default:
      return state;
  }
}
