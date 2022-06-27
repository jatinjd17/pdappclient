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
import Homepagecomponents from "../../components/homepagecomponents";
import fs from "fs";
import datajson from "../../jatajson.json";

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
        </View>
        <View>
          <TouchableOpacity>
            <Text
              onPress={() =>
                navigation.navigate("viewall", {
                  viewalldealtime: viewalldealtimeee,
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
            <Homepagecomponents
              dealtime={dealtimeeee}
              navigation={navigation}
            />
          </Text>
        </ScrollView>
      )}
    </View>
  );
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginBottom: 95, marginTop: 5 }}>
          <DealsRowComponentBlock
            DealTitle={"Todays Deals"}
            dealtimeeee={"todaysdealrandom"}
            viewalldealtimeee={"todaysdeal"}
            category={""}
            dealtimecat={"todaysdealcat"}
          />
          <DealsRowComponentBlock
            DealTitle={"Weekly Deals"}
            dealtimeeee={"weeklydealrandom"}
            viewalldealtimeee={"weeklydeal"}
            category={""}
            dealtimecat={"weeklydealcat"}
          />
          <DealsRowComponentBlock
            DealTitle={"Monthly Deals"}
            dealtimeeee={"monthlydealrandom"}
            viewalldealtimeee={"monthlydeal"}
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
