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
