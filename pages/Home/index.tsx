import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import HomepagecomponentsNew from "../../components/homepagecomponentsNew";
import UrlSearchComponent from "../../components/UrlSearchComponent";

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
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
