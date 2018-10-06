import * as webRequestUtil from "../utils/webRequestUtil";

export async function get_admin(roomId) {
  const url = "Room?roomId:" + roomId;
  const res = await webRequestUtil.get({ url });
  return res.data;
}

export async function get_room(roomId) {
  const url = "Room?roomId:" + roomId;
  const res = await webRequestUtil.get({ url });
  return res.data;
}

export async function set_room(data) {
  const url = "Room";
  const headers = {
    "content-type": "multipart/form-data",
  };
  const res = await webRequestUtil.post({ url, headers, body: data });
  return res.data;
}

export async function update_room(data) {
  const url = "Room";
  const headers = {
    "content-type": "multipart/form-data",
  };
  const res = await webRequestUtil.post({ url, headers, body: data });
  return res.data;
}
