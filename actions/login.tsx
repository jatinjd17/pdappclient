import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignOut = (next: any) => {
  //   removeCookie("token");
  //   removeLocalStorage("user");
  next();
  // return fetch(`${ServerURL}/api/signout`, {
  //   method: "GET",
  //   headers: {
  //     Accept: "applicaion/json",
  //   },
  // })
  //   .then((data) => {
  //     // console.log(data);

  //     return data.json();
  //   })
  //   .catch((err) => console.log(err));
};

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeStorage = async (token, data) => {
  try {
    await AsyncStorage.removeItem(token);
    await AsyncStorage.removeItem(data);
    // await AsyncStorage.removeItem(username);
    // console.log("items removed");
    return true;
  } catch (exception) {
    return false;
  }
};

export const removeFCMTokenStorage = async (fcmtoken) => {
  try {
    await AsyncStorage.removeItem(fcmtoken);
    // await AsyncStorage.removeItem(username);
    // console.log("items removed");
    return true;
  } catch (exception) {
    return false;
  }
};

export const authenticate = async (data, next) => {
  // console.log(data);
  // setCookie("token", data.token);
  // setLocalStorage("user", data.user);
  storeData("token", data.token);
  storeData("user", data.email);
  // storeData("username", data.user.username);
  next();
};

export const isAuth = async () => {
  //   const isToken = getCookie("token");
  const isToken = await getData("token");
  const userr = await getData("user");
  // const username = await getData("username");
  // console.log(userr);
  // console.log(isToken);
  if (isToken) {
    if (userr) {
      // console.log(isToken);
      // return { userr, username };
      return { userr };
    } else {
      return false;
    }
  }
};

export const isFCMTokenAuth = async () => {
  //   const isToken = getCookie("token");
  const isToken = await getData("fcmtoken");
  // const username = await getData("username");
  // console.log(userr);
  // console.log(isToken);
  if (isToken) {
    // console.log(isToken);
    // return { userr, username };
    return { isToken };
  } else {
    return false;
  }
};
