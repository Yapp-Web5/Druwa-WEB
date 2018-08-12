/*
* Author: @nayunhwan (github.com/nayunhwan)
* Email: nayunhwan.dev@gmail.com
*/

import * as webRequestUtil from "../utils/webRequestUtil";

export async function getTest() {
  const url = "YOUR-API-URL";
  const res = await webRequestUtil.get({ url });
  return res.data;
}
