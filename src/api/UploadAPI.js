/*
* Author: @nayunhwan (github.com/nayunhwan)
* Email: nayunhwan.dev@gmail.com
*/

import * as webRequestUtil from "../utils/webRequestUtil";

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export async function uploadPDF({ file }) {
  const base64 = await getBase64(file);
  const url = "api/files/upload";
  const body = {
    userfile: {
      name: file.name,
      data: base64,
    },
  };
  const res = await webRequestUtil.post({ url, body });
  return res.data;
}
