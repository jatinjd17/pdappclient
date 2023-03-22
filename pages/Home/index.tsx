import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import { TouchableOpacity } from "react-native-gesture-handler";
import HomepagecomponentsNew from "../../components/homepagecomponentsNew";
import UrlSearchComponent from "../../components/UrlSearchComponent";
import {
  isAuth,
  isFCMTokenAuth,
  removeFCMTokenStorage,
  removeStorage,
  storeData,
} from "../../actions/login";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function Home({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const getCurrentDate = () => {
    var time = new Date().toLocaleString();
    return (
      <View>
        <Text
          style={{
            fontSize: 8,
            fontWeight: "800",
            color: "grey",
            marginLeft: 3,
          }}
        >
          Last Updated:{"  "}
          {time.toString()}
        </Text>
      </View>
    );
  };

  const DealsRowComponentBlock = ({
    DealTitle,
    dealtimeeee,
    viewalldealtimeee,
    category,
    dealtimecat,
  }) => (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 21, marginTop: 3 }}>
            {DealTitle}
          </Text>
          {getCurrentDate()}
        </View>
        <View style={{ marginTop: 5 }}>
          <TouchableOpacity>
            <Text
              onPress={() =>
                navigation.navigate("viewall", {
                  viewalldealtime: dealtimeeee,
                  category: category,
                  dealtimecat: dealtimecat,
                  originalviewalldealtime: viewalldealtimeee,
                })
              }
              style={{
                flex: 1,
                textAlign: "right",
                justifyContent: "center",
                paddingTop: 7,
                paddingRight: 5,
                fontWeight: "500",
                color: "red",
                textDecorationLine: "underline",
              }}
            >
              View More {`->`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {refreshing ? (
        <ActivityIndicator color="red" size={"large"} />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <Text>
            <HomepagecomponentsNew
              dealtime={dealtimeeee}
              navigation={navigation}
            />
          </Text>
        </ScrollView>
      )}
    </View>
  );

  ////////////////////////////////////////////////NEW\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  const requestUserPermission = async () => {
    ////////////////////////IMP\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //   console.log("Authorization status:", authStatus);
    // }
    /////////////////////////IMPEND\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    if (Platform.OS === "android") {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return false;
      } else {
        return true;
      }

      // const permission = await Notifications.requestPermissionsAsync();
      // if (!permission.granted) {
      //   return false;
      // } else {
      //   return true;
      // }

      ///////////////////////////////
      // const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      // if (status !== "granted") {
      //   console.log("Permission to receive notifications was denied");
      //   return false;
      // } else {
      //   return true;
      // }
    }
  };

  useEffect(() => {
    isaut();
  }, []);

  const isaut = async () => {
    let email = "";
    const auttt2 = await isAuth();
    if (!auttt2) {
      email = "";
    } else {
      email = auttt2.userr;
    }
    const auttt = await isFCMTokenAuth();
    if (!auttt) {
      if (requestUserPermission()) {
        messaging()
          .getToken()
          .then((token) => {
            console.log(token);
            console.log(email);

            storeData("fcmtoken", token);
            fetch("http://3.110.124.205:8000/100", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                fcmtoken: token,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                // console.log("hhhhhhhhhh");
              })
              .catch((e) => {
                console.log(e);
              });
          });
      } else {
        console.log("Failed token status");
      }
      // navigation.replace("signin");
    } else if (email) {
      if (requestUserPermission()) {
        messaging()
          .getToken()
          .then((token) => {
            console.log(token);
            console.log(email);

            storeData("fcmtoken", token);
            fetch("http://3.110.124.205:8000/100", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                fcmtoken: token,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                // console.log("hhhhhhhhhh");
              })
              .catch((e) => {
                console.log(e);
              });
          });
      } else {
        console.log("Failed token status");
      }
    } else {
      console.log("already logged");
    }
  };

  useEffect(() => {
    // if (requestUserPermission()) {
    //   messaging()
    //     .getToken()
    //     .then((token) => {
    //       console.log(token);
    //     });
    // } else {
    //   console.log("Failed token status", authStatus);
    // }

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          // console.log(
          //   "Notification caused app to open from quit state:",
          //   remoteMessage.notification
          // );
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      // console.log(
      //   "Notification caused app to open from background state:",
      //   remoteMessage.notification
      // );

      // console.log(remoteMessage.data);

      if (!remoteMessage.data.url) {
        if (
          remoteMessage.data.viewalldealtime &&
          remoteMessage.data.viewallcategory
        ) {
          // console.log("time and category available");
          // console.log(remoteMessage.data.viewalldealtime);
          // console.log("time and category available");
          navigation.navigate("viewall", {
            category: remoteMessage.data.viewallcategory,
            viewalldealtime: remoteMessage.data.viewalldealtime,
            originalviewalldealtime: remoteMessage.data.viewalldealtime,
          });
        } else {
          console.log("One of Both not available");
        }
        // if (remoteMessage.notification.android.clickAction) {
        //   console.log("ClickAction Available");
        //   // navigation.navigate("viewall", {
        //   //   catetogry: ,
        //   //   dealtime:
        //   // });
        // }
        // console.log("No url link");
      } else {
        // console.log("Has url link");
        navigation.navigate("urlspecificproductpage", {
          producturl: remoteMessage.data.url,
        });
      }

      // navigation.navigate(remoteMessage.data.type);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  ////////////////////////////////////END\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  return (
    <View style={{ backgroundColor: "#FFF9F9" }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginBottom: 95, marginTop: 5 }}>
          <UrlSearchComponent navigation={navigation} />
          {/* <TouchableOpacity onPress={() => removeFCMTokenStorage("fcmtoken")}>
            <Text>Logout</Text>
          </TouchableOpacity> */}

          <DealsRowComponentBlock
            DealTitle={"Todays Deals"}
            dealtimeeee={"todaysDeals"}
            viewalldealtimeee={"todaysDeals"}
            category={""}
            dealtimecat={"todaysdealcat"}
          />
          <DealsRowComponentBlock
            DealTitle={"Weekly Deals"}
            dealtimeeee={"week"}
            viewalldealtimeee={"week"}
            category={""}
            dealtimecat={"weeklydealcat"}
          />
          <DealsRowComponentBlock
            DealTitle={"Monthly Deals"}
            dealtimeeee={"month"}
            viewalldealtimeee={"month"}
            category={""}
            dealtimecat={"monthlydealcat"}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
