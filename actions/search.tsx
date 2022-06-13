export const getSearchdataaction = (params: any) => {
  return fetch(`https://pdappserver.herokuapp.com/api/search?id=${params}`, {
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
