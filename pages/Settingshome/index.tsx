import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getData, isAuth, removeStorage } from "../../actions/login";
import { trackallproductsuser } from "../../actions/trackproduct";
import Trackeduserproducts from "../../components/trackeduserproducts";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function Settings({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const [username, setusername] = useState("");

  useEffect(() => {
    isaut();
    // blogs();
    // allproductstracked();
  }, [refreshing]);
  const [trackedproducts, settrackedproducts] = useState([]);

  const isaut = async () => {
    const auttt = await isAuth();
    if (!auttt) {
      // setusername(auttt.username);
      navigation.replace("signin");
    } else {
      // console.log(auttt.username);
      setusername(auttt.userr);
      blogs();
      // navigation.navigate("signup");
    }
  };

  // const allproductstracked = () => {
  //   console.log(username);
  //   trackallproductsuser(username)
  //     .then((data) => {
  //       // console.log(data.trackedproducts);
  //       settrackedproducts(data.trackedproducts);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const Showproducts = (trackedproducts) => {
  //   return trackedproducts.map((p, i) => {
  //     return (
  //       <View key={i}>
  //         <Text>{p.product}</Text>
  //       </View>
  //     );
  //   });
  // };

  // allproductstracked();

  const blogs = async () => {
    const email = await getData("user");
    setusername(email);
    const all: any = await allBlogs(email);
    console.log(all);
    if (all) {
      settrackedproducts(all);
    }
  };

  // const allBlogs = (username) => {
  //   return trackallproductsuser(username).then((data) => {
  //     if (!data) {
  //       return false;
  //     } else {
  //       console.log(data);
  //       return data.trackedproducts;
  //     }
  //   });
  // };

  const allBlogs = (username) => {
    console.log(username);
    setisLoading(true);
    return fetch("http://3.110.124.205:8000/777", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: username }),
      // body: JSON.stringify({
      //   url: `https://www.pricebefore.com/price-drops/?category=laptops&price-drop=${dealtime}&more=true`,
      // }),
    })
      .then((response) =>
        // console.log(response);
        response.json()
      )
      .then((data) => {
        if (!data) {
          setisLoading(false);
          return null;
        }
        setisLoading(false);

        console.log("8888888888888888888888888888888");
        // console.log(data.data.trackedproducts);
        return data.data.trackedproducts;
        console.log("999999999999999999999999999999");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllBlogsHome = (blogs) => {
    // console.log(bbb);
    if (blogs != null) {
      return blogs.map((b, i) => {
        return (
          <View key={i}>
            {/* <Text>{b.product}</Text> */}
            <Trackeduserproducts
              products={b}
              username={username}
              navigation={navigation}
            />
            {/* <BlogCard card={b} navigation={navigation} /> */}
          </View>
        );
      });
    } else {
      return null;
    }
  };

  // const newwwwww = (username) => {
  //   trackallproductsuser(username).then((data) => {
  //     if (!data) {
  //       return null;
  //     } else {
  //       return data.trackedproducts.map((b, i) => {
  //         return (
  //           <View key={i}>
  //             <Text>{b.product}</Text>
  //             {/* <BlogCard card={b} navigation={navigation} /> */}
  //           </View>
  //         );
  //       });
  //     }
  //   });
  //   // console.log(bbb);
  //   // if (blogs != null) {
  //   //   return blogs.map((b, i) => {
  //   //     return (
  //   //       <View key={i}>
  //   //         <Text>{b.product}</Text>
  //   //         {/* <BlogCard card={b} navigation={navigation} /> */}
  //   //       </View>
  //   //     );
  //   //   });
  //   // } else {
  //   //   return null;
  //   // }
  // };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ marginBottom: 98, backgroundColor: "#FFF9F9" }}
    >
      {
        username ? getAllBlogsHome(trackedproducts) : null
        // <Text>Loading...</Text>
      }
      {/* {username ? newwwwww(username) : <Text>Loading...</Text>} */}
      {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: 15 }}
          color="red"
          size={"large"}
        />
      ) : null}
      {trackedproducts.length == 0 && isLoading == false ? (
        <View>
          <Text
            style={{
              flex: 1,
              marginTop: 250,
              textAlign: "center",
              color: "grey",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            No Tracking Products Yet
          </Text>
        </View>
      ) : null}
      <View>
        {/* <Button
          title="LogOut"
          onPress={() => {
            removeStorage("token", "user", "username");
            setRefreshing(true);
          }}
        /> */}
      </View>
      {/* <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button title="Check if is auth or not" onPress={() => isaut()} />

        <Text style={{ fontSize: 20, fontWeight: "700", color: "grey" }}>
          Comming Soon...
        </Text>

        <Button onPress={() => navigation.navigate("signin")} title="SignIN" />
        <Button onPress={() => navigation.navigate("signup")} title="SignUP" />
        <Text>{trackedproducts ? Showproducts(trackedproducts) : ""}</Text>
      </View> */}
    </ScrollView>
  );
}

export default Settings;
