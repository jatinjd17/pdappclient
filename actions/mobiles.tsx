import { ServerURL } from "../url/url";

export const getallmobiles = ({ platform, category }) => {
  return fetch(
    `${ServerURL}/api/allproducts?platform=${platform}&category=${category}`,
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
