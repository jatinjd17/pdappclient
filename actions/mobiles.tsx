export const getallmobiles = ({ platform, category }) => {
  return fetch(
    `https://pdappserver.herokuapp.com/api/allproducts?platform=${platform}&category=${category}`,
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
