import { ServerURL } from "../url/url";

export const Trackproduct = (formdata: any) => {
  console.log(formdata);

  return fetch(`${ServerURL}/api/trackproduct`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  })
    .then((data) => {
      return data.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const trackallproductsuser = (username) => {
  //   console.log(dealstime);
  return fetch(`${ServerURL}/api/trackproductuser?username1=${username}`, {
    // http://192.168.29.231:8000/api/${dealstime}
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

export const deletetrackedproductbyuser = (username, productid) => {
  //   console.log(dealstime);
  return fetch(
    `${ServerURL}/api/deletetrackedproduct?username1=${username}&productid=${productid}`,
    {
      // http://192.168.29.231:8000/api/${dealstime}
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
