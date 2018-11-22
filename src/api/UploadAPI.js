/*
 * Author: @nayunhwan (github.com/nayunhwan)
 * Email: nayunhwan.dev@gmail.com
 */

import * as webRequestUtil from "../utils/webRequestUtil";

export async function uploadPDF({ data }) {
  const url = "api/upload";
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const res = await webRequestUtil.post({ url, headers, data });
  return res.data;
}
