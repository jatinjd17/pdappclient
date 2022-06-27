import { ServerURL } from "../url/url";

export const getSearchdataaction = (params: any) => {
  return fetch(`${ServerURL}/api/search?id=${params}`, {
    method: "GET",
    headers: {
      Accept: "applicaion/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => console.log(err));
};
