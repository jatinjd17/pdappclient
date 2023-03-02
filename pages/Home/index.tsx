import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isAuth } from "../../actions/login";
import { trackallproductsuser } from "../../actions/trackproduct";
// import Homepagecomponents from "../../components/homepagecomponents";
import HomepagecomponentsNew from "../../components/homepagecomponentsNew";
import fs from "fs";
import datajson from "../../jatajson.json";
import UrlSearchComponent from "../../components/UrlSearchComponent";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function Home({ navigation }) {
  // useEffect(() => {
  //   isAuth().then((data) => {
  //     if (data) {
  //       setusername(data.username);
  //     }
  //   });
  // });

  const [username, setusername] = useState("");
  const [trigger, settrigger] = useState(true);
  const [userallproducts, setuserallproducts] = useState([]);
  var jdsss = [];

  // useEffect(() => {
  //   isAuth().then((data) => {
  //     if (data) {
  //       setusername(data.username);
  //       // trackallproductsuser(data.username).then((data) => {
  //       //   // console.log(data.trackedproducts);
  //       //   // settrigger(false);
  //       //   // data.trackedproducts.forEach((element) => {
  //       //   //   console.log(element.product);
  //       //   // });
  //       //   // data.trackedproducts.map((p, i) => {
  //       //   //   // setuserallproducts(p.product);
  //       //   //   // jdsss.push(p.product);
  //       //   // });
  //       //   // setuserallproducts(data.trackedproducts);
  //       // });
  //     }
  //   });
  // }, []);

  // if (trigger) {
  //   if (username) {
  //     trackallproductsuser(username).then((data) => {
  //       console.log(data.trackedproducts);
  //       settrigger(false);
  //       data.trackedproducts.forEach((element) => {
  //         console.log(element.product);
  //       });
  //       // data.trackedproducts.map((p, i) => {
  //       //   setuserallproducts(p.product);
  //       // });
  //       // setuserallproducts(data.trackedproducts);
  //     });
  //   }
  // }

  const [refreshing, setRefreshing] = React.useState(false);
  // const [trigger, settrigger] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  // const aut = async () => {
  //   if (trigger) {
  //     console.log(
  //       "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
  //     );
  //     settrigger(false);
  //     const isaut = await isAuth();
  //     if (isaut) {
  //       setusername(isaut.username);
  //     }
  //   }
  // };

  // aut();

  const getCurrentDate = () => {
    // var date = new Date().getDate();
    // var month = new Date().getMonth() + 1;
    // var year = new Date().getFullYear();

    var time = new Date().toLocaleString();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
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
          {
            // date.toString() +
            //   "-" +
            //   month.toString() +
            //   "-" +
            //   year.toString() +
            //   "-" +
            time.toString()
          }
        </Text>
      </View>
    );
    //format: d-m-y;
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
        // <Text>Loading...</Text>
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
  return (
    <View style={{ backgroundColor: "#FFF9F9" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginBottom: 95, marginTop: 5 }}>
          <UrlSearchComponent navigation={navigation} />
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
          <View>{jdsss ? <Text>{jdsss}</Text> : " "}</View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
