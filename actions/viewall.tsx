import { ServerURL } from "../url/url";

export const viewalltodaysdealaction = ({ dealtime }) => {
  console.log();
  return fetch(`${ServerURL}/api/${dealtime}`, {
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

export const viewallweeklydealaction = ({ platform, category }) => {
  console.log();
  return fetch(
    `${ServerURL}/api/allproductsviewall?platform=${platform}&category=${category}`,
    {
      method: "GET",
      headers: {
        Accept: "applicaion/json",
      },
    }
  )
    .then((data) => {
      return data.json();
    })
    .catch((err) => console.log(err));
};

export const viewalldealcataction = ({ dealtime, category }) => {
  console.log();
  return fetch(`${ServerURL}/api/${dealtime}?category=${category}`, {
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
