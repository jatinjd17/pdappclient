import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getData, isAuth } from "../../actions/login";
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
  }, [refreshing]);
  const [trackedproducts, settrackedproducts] = useState([]);

  const isaut = async () => {
    const auttt = await isAuth();
    if (!auttt) {
      navigation.replace("signin");
    } else {
      setusername(auttt.userr);
      blogs();
    }
  };

  const blogs = async () => {
    const email = await getData("user");
    setusername(email);
    const all: any = await allBlogs(email);
    // console.log(all);
    if (all) {
      settrackedproducts(all);
    }
  };

  const allBlogs = (username) => {
    setisLoading(true);
    return fetch("http://3.110.124.205:8000/777", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: username }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          setisLoading(false);
          return null;
        }
        setisLoading(false);
        return data.data.trackedproducts;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllBlogsHome = (blogs) => {
    if (blogs != null) {
      return blogs.map((b, i) => {
        return (
          <View key={i}>
            <Trackeduserproducts
              products={b}
              username={username}
              navigation={navigation}
            />
          </View>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ marginBottom: 98, backgroundColor: "#FFF9F9" }}
    >
      {username ? getAllBlogsHome(trackedproducts) : null}
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
    </ScrollView>
  );
}

export default Settings;
