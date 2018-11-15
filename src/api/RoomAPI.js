/*
 * Author: @nayunhwan (github.com/nayunhwan)
 * Email: nayunhwan.dev@gmail.com
 */

import * as webRequestUtil from "../utils/webRequestUtil";

export async function createRoom({ title, lecturer, password }) {
  const token = localStorage.getItem("token");
  const url = "api/rooms";
  const headers = {
    token,
  };
  const body = {
    title,
    lecturer,
    description: "",
    maxParticipants: 100,
    isPublic: false,
    pdfPath: "",
    password,
  };
  const res = await webRequestUtil.post({ url, headers, body });
  return res.data;
}

export async function getRoom(roomUrl) {
  const token = localStorage.getItem("token");
  const url = `api/rooms/${roomUrl}`;
  const headers = {
    token,
  };
  const res = await webRequestUtil.get({ url, headers });
  return res.data;
}
