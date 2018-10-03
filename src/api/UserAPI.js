/*
* Author: @nayunhwan (github.com/nayunhwan)
* Email: nayunhwan.dev@gmail.com
*/

import * as webRequestUtil from "../utils/webRequestUtil";

export async function createUser() {
  const url = "api/users";
  const res = await webRequestUtil.post({ url });
  return res.data;
}

export async function getUser(token) {
  const url = "api/users";
  const headers = {
    token,
  };
  const res = await webRequestUtil.get({ url, headers });
  return res.data;
}
