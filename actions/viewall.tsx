export const viewalltodaysdealaction = ({ dealtime }) => {
  console.log();
  return fetch(`https://pdappserver.herokuapp.com/api/${dealtime}`, {
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
    `https://pdappserver.herokuapp.com/api/allproductsviewall?platform=${platform}&category=${category}`,
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
  return fetch(
    `https://pdappserver.herokuapp.com/api/${dealtime}?category=${category}`,
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
