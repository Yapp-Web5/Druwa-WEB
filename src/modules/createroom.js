import * as createRoomAPI from "../api/createRoomAPI";

const DefaultAction = {
  START_CREATE_ROOM: "START_CREATE_ROOM",
  FAILED_CREATE_ROOM: "FAILED_CREATE_ROOM",
  SUCCEED_CREATE_ROOM: "SUCCEED_CREATE_ROOM",
  START_UPDATE_ROOM: "UPDATE_CREATE_ROOM",
  FAILED_UPDATE_ROOM: "FAILED_UPDATE_ROOM",
  SUCCEED_UPDATE_ROOM: "SUCCEED_UPDATE_ROOM",
  START_GET_ROOM: "START_GET_ROOM",
  FAILED_GET_ROOM: "FAILED_GET_ROOM",
  SUCCEED_GET_ROOM: "SUCCEED_GET_ROOM",
  START_GET_ADMIN: "START_GET_ADMIN",
  FAILED_GET_ADMIN: "FAILED_GET_ADMIN",
  SUCCEED_GET_ADMIN: "SUCCEED_GET_ADMIN",
};

//모듈 초기 상태 정의
const initialState = {
  status: "INIT",
  data: {
    files: "",
    title: "",
    writer: "",
    password: "",
    admin: {},
  },
};

/**
 * @author AnGwangHo
 * @returns arrays[]
 * @throws error:404
 * @param {roomId} roomId
 * 방의 관리자 리스트를 얻어오는 Get 함수
 */
export function getAdmin(roomId) {
  return async dispatch => {
    try {
      //요청 시작
      dispatch({ type: DefaultAction.START_GET_ADMIN });

      //RoomId를 기준으로 Admin List 획득
      const data = await createRoomAPI.get_admin(roomId);
      dispatch({
        type: DefaultAction.SUCCEED_GET_ADMIN,
        payload: {
          data,
        },
      });
    } catch (error) {
      dispatch({
        type: DefaultAction.FAILED_GET_ADMIN,
        payload: error,
      });
    }
  };
}

export function getRoom(roomId) {
  return async dispatch => {
    try {
      dispatch({ type: DefaultAction.START_GET_ROOM });

      const data = await createRoomAPI.get_room(roomId);

      dispatch({
        type: DefaultAction.SUCCEED_GET_ROOM,
        payload: {
          data,
        },
      });
    } catch (error) {
      dispatch({
        type: DefaultAction.FAILED_GET_ROOM,
        payload: error,
      });
    }
  };
}

export function setRoom(formdata) {
  return async dispatch => {
    try {
      //요청 시작
      dispatch({ type: DefaultAction.START_CREATE_ROOM });

      const data = await createRoomAPI.set_room(formdata);

      dispatch({
        type: DefaultAction.SUCCEED_CREATE_ROOM,
        payload: {
          data,
        },
      });
    } catch (error) {
      dispatch({
        type: DefaultAction.FAILED_CREATE_ROOM,
        payload: error,
      });
    }
  };
}

export function updateRoom(formData) {
  return async dispatch => {
    try {
      dispatch({ type: DefaultAction.START_UPDATE_ROOM });

      const data = await createRoomAPI.update_room(formData);
      dispatch({
        type: DefaultAction.SUCCEED_UPDATE_ROOM,
        payload: {
          data,
        },
      });
    } catch (error) {
      dispatch({
        type: DefaultAction.FAILED_UPDATE_ROOM,
        payload: error,
      });
    }
  };
}

//리듀서 방출
/** 추후 status 응답코드 숫자로 변경 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DefaultAction.START_CREATE_ROOM:
      return { ...state, status: "START_CREATE_ROOM" };
    case DefaultAction.FAILED_CREATE_ROOM:
      return { ...state, status: "FAILED_CREATE_ROOM" };
    case DefaultAction.SUCCEED_CREATE_ROOM:
      return { ...state, status: "SUCCEED_CREATE_ROOM" };
    case DefaultAction.START_UPDATE_ROOM:
      return { ...state, status: "START_UPDATE_ROOM" };
    case DefaultAction.FAILED_UPDATE_ROOM:
      return { ...state, status: "FAILED_UPDATE_ROOM" };
    case DefaultAction.SUCCEED_UPDATE_ROOM:
      return { ...state, status: "SUCCEED_UPDATE_ROOM" };
    case DefaultAction.START_GET_ROOM:
      return { ...state, status: "START_GET_ROOM" };
    case DefaultAction.FAILED_GET_ROOM:
      return { ...state, status: "FAILED_GET_ROOM" };
    case DefaultAction.SUCCEED_GET_ROOM:
      const { files, title, writer, password } = action.payload.data;
      return {
        ...state,
        status: "SUCCEED_GET_ROOM",
        data: { files, title, writer, password },
      };
    case DefaultAction.START_GET_ADMIN:
      return { ...state, status: "START_GET_ADMIN" };
    case DefaultAction.FAILED_GET_ADMIN:
      return { ...state, status: "FAILED_GET_ADMIN" };
    case DefaultAction.SUCCEED_GET_ADMIN:
      const { admin } = action.payload.data;
      return {
        ...state,
        status: "SUCCEED_GET_ADMIN",
        data: { admin },
      };
    default:
      return state;
  }
}
