/*
 * Author: @nayunhwan (github.com/nayunhwan)
 * Email: nayunhwan.dev@gmail.com
 */

import { SERVER_END_POINT } from "../configs/server";
import axios from "axios";

const basicRequest = (type, { url, headers, body, origin }) => {
  const config = {
    method: type,
    url: origin ? origin : SERVER_END_POINT + url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    data: body,
  };

  return axios(config)
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err.response;
    });
};

export const get = ({ url, headers, body }) => {
  return basicRequest("GET", { url, headers, body });
};

export const post = ({ url, headers, body }) => {
  return basicRequest("POST", { url, headers, body });
};

export const del = ({ url, headers, body }) => {
  return basicRequest("DELETE", { url, headers, body });
};

export const put = ({ url, headers, body }) => {
  return basicRequest("PUT", { url, headers, body });
};
