export const gettodaysDeals = (dealstime) => {
  console.log(dealstime);
  return fetch(`https://pdappserver.herokuapp.com/api/${dealstime}`, {
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
