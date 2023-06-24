import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:3001" });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer Token`;

  const onSuccess = (response) => response;

  const onError = (error) => {
    //optionally catch errors and do other error stuff
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
