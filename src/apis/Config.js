import axios from "axios";
import Global from "../constants/Global";

const Config = {
  post: (subUrl, data) => {
    let method = "POST";
    return RequestHandler.handelRequest(subUrl, data, method);
  },
  get: (subUrl, parameters) => {
    let method = "GET";
    return RequestHandler.handelRequest(subUrl, parameters, method);
  },
};
const ABSOLUTE_URL = /^https?:\/\/(\w+(:\d{4})?)\/?/;
const RequestHandler = {
  handelRequest: (subUrl, data, method, config) => {
    let isAbsoluteUrl = ABSOLUTE_URL.test(subUrl);
    let url = "";

    if (isAbsoluteUrl) url = subUrl;
    else url = Global.URL + subUrl;

    return new Promise((resolve, reject) => {
      axios({
        method,
        url,
        data,
        headers: {
          // 'crossOrigin': true,
          // 'Access-Control-Allow-Origin': 'http://localhost:3000/',
          // 'Access-Control-Allow-Methods' : 'OPTIONS, GET, POST, HEAD, DELETE',
          // 'Access-Control-Expose-Headers' : '',
          // 'Access-Control-Allow-Headers' : 'Content-Type, Acccept, Access-Control-Allow-Origin, Authorization',
          // 'Access-Control-Max-Age' : '21600',
          // 'Allow': 'OPTIONS, GET, POST, HEAD, DELETE',
          // 'Content-Type':  Global.contentType,
          // 'redirect': 'follow'
        },
      })
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
  handleResponse: (response) => {
    return response;
  },
};

export default Config;
