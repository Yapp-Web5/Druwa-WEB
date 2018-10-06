import * as webRequestUtil from "../utils/webRequestUtil";

export async function get_room(roomId) {
  const url = "room";
  const res = await webRequestUtil.get({ url });
  return res.data;
}
