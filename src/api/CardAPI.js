/*
 * Author: @nayunhwan (github.com/nayunhwan)
 * Email: nayunhwan.dev@gmail.com
 */

import * as webRequestUtil from "utils/webRequestUtil";
import { getUserToken } from "utils/authManager";

export async function createCard(roomUrl, content, refPageIdx) {
  const token = getUserToken();
  const url = `api/cards/${roomUrl}`;
  const headers = {
    token,
  };
  const body = {
    content,
    refPageIdx,
  };
  const res = await webRequestUtil.post({ url, headers, body });
  return res.data;
}

export async function likeCard(roomUrl, cardId) {
  const token = getUserToken();
  const url = `api/cards/${roomUrl}/${cardId}/like`;
  const headers = {
    token,
  };
  const res = await webRequestUtil.put({ url, headers });
  return res.data;
}

export async function unlikeCard(roomUrl, cardId) {
  const token = getUserToken();
  const url = `api/cards/${roomUrl}/${cardId}/unlike`;
  const headers = {
    token,
  };
  const res = await webRequestUtil.put({ url, headers });
  return res.data;
}

export async function removeCard(roomUrl, cardId) {
  const token = getUserToken();
  const url = `api/cards/${roomUrl}/${cardId}`;
  const headers = {
    token,
  };
  const res = await webRequestUtil.del({ url, headers });
  return res.data;
}
